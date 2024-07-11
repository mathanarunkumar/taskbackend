const fildschema = require('../models/login-model')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.singUpPage =async (req, res, next) => {
    try {
        // console.log(req.body)
        let alreadyEmail = await fildschema.findOne({ EmailId: req.body.EmailId }); //dbquery
        if (alreadyEmail) {
          return res.status(400).json("Email exist");
        }
        let pass = await bcrypt.hash(req.body.Password, 10);
    
        const data = new fildschema({
          EmailId: req.body.EmailId,
          Password: pass,
        });
        let user = await data.save();
        res.status(200).json(user);
      } catch (err) {
        res.status(500).send("err");
        console.log(err);
      }
  };
  

  exports.loginPage = async(req,res,next) => {
    try {
        let user = await fildschema.findOne({ EmailId: req.body.EmailId }); //dbquery
    
        if (!user) {
          return res.status(400).json("Wrong credentials!");
        }
    
        let passwordValidation = await bcrypt.compare(
          req.body.Password,
          user.Password
        );
        if (!passwordValidation) {
          return res.status(400).json("Your Password Wrong!");
        }
    
        let accessToken  = jwt.sign(
          { _id: user._id, EmailId: user.EmailId },
          "userinfoSecretId"
        );
    
        res.json({
            accessToken: accessToken,
            EmailId: user.EmailId,
            _id: user._id
          });      
        } catch (err) {
        res.status(500).send("Wrong credentials...!");
        // console.log(err);
      }
  }