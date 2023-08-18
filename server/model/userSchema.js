const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = "kdjdmmddmckdmdksskdmfkffmjhgfds";

const userSchema = new mongoose.Schema({
          name: {
                    type: String,
                    required: true
          },
          email: {
                    type: String,
                    unique: true,
                    required: true,
                    validator(value) {
                              if (!validator.isEmail(value)) {
                                        throw new Error('Invalid Email')
                              }
                    }
          },
          password: {
                    type: String,
                    minlength: 6,
                    required: true
          },
          cpassword: {
                    type: String,
                    minlength: 6,
                    required: true
          },
          tokens: [{
                    token: {
                              type: String,
                              required: true
                    }
          }]
});


//hash password...
userSchema.pre("save", async function (next) {
          if (this.isModified("password")) {
                    this.password = await bcrypt.hash(this.password, 12);
                    this.cpassword = await bcrypt.hash(this.cpassword, 12);
          }

          next();
})



//create token
userSchema.methods.generatetoken = async function () {
          try {
                    let token = jwt.sign({
                              _id: this._id
                    }, keysecret, {
                              expiresIn: "1d"
                    });


                    this.tokens = this.tokens.concat({
                              token: token
                    });

                    await this.save();
                    return token;

          } catch (error) {
                    res.status(422).json({
                              error: "Not generate token..."
                    })
          }
}




const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;