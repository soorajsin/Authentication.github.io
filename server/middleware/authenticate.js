const jwt = require("jsonwebtoken");
const userdb = require("../model/userSchema");
const keysecret = "kdjdmmddmckdmdksskdmfkffmjhgfds";


const authenticate = async (req, res, next) => {
          try {
                    let token = req.headers.authorization;
                    //console.log("Auhtenticate token get.........        " + token);


                    const verifytoken = jwt.verify(token, keysecret);
                    //console.log(verifytoken);

                    const rootUser = await userdb.findOne({
                              _id: verifytoken._id
                    });
                    // console.log(rootUser);

                    if (!rootUser) {
                              throw new Error("User not found")
                    }

                    req.token = token
                    req.rootUser = rootUser
                    req.userId = rootUser._id

                    next();


          } catch (error) {
                    res.status(401).json({status:401, message:"Unauthorised no token provided"})
          }
}

module.exports = authenticate;