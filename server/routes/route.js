const express = require("express");
const router = new express.Router();
const userdb = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");



//get- send data by url
//post -send data, nut not use url (sencitive data login, sign up)
router.post("/register", async (req, res) => {
          console.log(req.body);

          const {
                    name,
                    email,
                    password,
                    cpassword
          } = req.body;

          if (!name || !email || !password || !cpassword) {
                    res.status(201).json({
                              error: "Please Fill the all fields...."
                    })
          }

          if (password !== cpassword) {
                    res.status(422).json({
                              error: "password and confirm password not match..."
                    })
          } else {
                    try {

                              const finalUser = new userdb({
                                        name,
                                        email,
                                        password: hashpassword,
                                        cpassword: hashpassword
                              });

                              const storedata = await finalUser.save();

                              // console.log(storedata);

                              res.status(201).json({
                                        status: 201,
                                        storedata,
                                        message: "Data Saved Successfully!!!"
                              })
                    } catch (error) {
                              res.status(422).json({
                                        error: "Data not save in database..."
                              })
                    }
          }
});



//used for login part
router.post("/login", async (req, res) => {
          const {
                    email,
                    password
          } = req.body;
          // console.log(req.body);

          if (!email || !password) {
                    res.status(201).json({
                              errro: "Plz Fill the all details...."
                    })
          }


          try {
                    const preUser = await userdb.findOne({
                              email: email
                    })
                    if (preUser) {
                              const isMatch = await bcrypt.compare(password, preUser.password);
                              if (!isMatch) {
                                        return res.status(500).send("Invalid Password");
                              } else {
                                        console.log("Login user...");


                                        const token = await preUser.generatetoken();
                                        console.log(token);


                                        //cookie generate
                                        res.cookie("usercookie", token, {
                                                  expires: new Date(Date.now() + 9000000),
                                                  httpOnly: true
                                        })


                                        const result = {
                                                  preUser,
                                                  token
                                        }
                                        console.log(result);

                                        res.status(201).json({
                                                  status: 201,
                                                  result
                                        })
                              }
                    }



          } catch (error) {
                    res.status(401).json({
                              error: "Not Login user....."
                    })
          }
});





// //valid user 
router.get("/validuser", authenticate, async (req, res) => {
          // console.log("Done.....");
          //after
          try{
                    const validUserOne=await userdb.findOne({_id:req.userId});
                    res.status(201).json({
                              status:201, validUserOne
                    })
          }catch(error){
                    res.status(401).json({
                              status:401, error
                    })
          }

})


module.exports = router;