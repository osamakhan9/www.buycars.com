const userModel = require("../model/user.model");

const createUser =  async (req, res) => {
    const email_users = await userModel.find({
      email: req.body.email,
    });
    if (email_users.length >= 1) {
      res.status(404).json({
        message: "EmailID already exists",
        status: false,
      });
    } else {
      try {
        const new_user = await userModel.create({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
        });
  
        res.status(201).json({
          message: "Signup Successfull",
          status: true,
        });
      } catch (error) {
        res.status(404).json({
          message: error.message,
          status: false,
        });
      }
    }
  }


  const loginUser = async (req, res) => {
    try {
      const user = await userModel.find({ email: req.body.email , password : req.body.password });
  
      if(user.length >= 1){
          res.send({message:'Login successfull' , status: true,  user : user[0]})
      }
      else{
          res.status(401).json({
              message: "EMAIL OR PASSWORD IS INCORRECT",
              status: false,
            });
      }
       
    } catch (error) {
      res.status(404).json({
        message: "EMAIL OR PASSWORD IS INCORRECT",
        status: false,
      });
    }
  }




module.exports = {createUser , loginUser}