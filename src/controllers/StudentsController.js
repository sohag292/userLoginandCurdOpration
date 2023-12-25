const StudentsModel =  require("../models/StudentsModel");
const OTPModel = require("../models/OTPModel");
const jwt = require('jsonwebtoken');

exports.createStudentProfile = async(req, res)=>{
    try {
        const reqBody = req.body;
        const data = await StudentsModel.create(reqBody);
        res.status(200).json({
            status: "Success",
            data: data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.userLogin = async(req, res)=>{
    let reqBody = req.body["email"]
    console.log(reqBody);

    try {
        const data = await StudentsModel.findOne({email:reqBody});
        console.log(data);
          if (data) {
            let Token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data:data
              }, 'secretKey1234');
            res.status(200).json({ status: "success", Token:Token, data:data });
    
        } else {
          res.status(401).json({ status: "unauthorized" });
        }
      } catch (err) {
        res.status(500).json({ status: "fail", message: "Internal server error" });
      }
}

exports.readStudentProfile = async(req, res)=>{
  let email = req.headers["email"];
  try {
      let data = await StudentsModel.find({email: email});
      console.log(data);
      res.status(200).json({
          status: "Success",
          data: data
      });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      data: error
  })
  }
};

exports.updateStudentProfile = async(req,res)=>{
  let email = req.headers["email"];
  let reqBody = req.body;
  
  try{
    let data = await StudentsModel.updateOne({email: email}, reqBody);
    res.status(200).json({
      status: "Success",
      data: data
  });
  }catch(err){
    res.status(404).json({
      status: "Fail",
      data: error.toString()
  })
  }
}

exports.recoverVerifyEmail=async (req,res)=>{
  let email = req.params.email;
  let OTPCode = Math.floor(100000 + Math.random() * 900000);
  let EmailText="Your Sudent ID Verification Code is ="+ OTPCode
  let EmailSubject="Student Registration verification code"

  let result = await StudentsModel.find({email:email}).count();
  if(result===1){
     await SendEmailUtility(email, EmailText, EmailSubject);
     await OTPModel.create({email: email, otp: OTPCode });
     res.status(200).json({status:"success",data:"6 Digit Verification Code has been send"})
  }
  else{
      res.status(401).json({status:"fail",data:"No User Found"})
  }
};













exports.DeleteStudentProfile = async(req,res)=>{
  let email = req.headers["email"];
  let reqBody = req.body;
  
  try{
    let data = await StudentsModel.deleteOne({email: email}, reqBody);
    res.status(200).json({
      status: "Success",
      data: data
  });
  }catch(err){
    res.status(404).json({
      status: "Fail",
      data: error.toString()
  })
  }
}