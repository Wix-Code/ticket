import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator  from "validator"
import nodemailer from "nodemailer"
import mongoose from "mongoose";



export const register = async (req,res) => {

  const {password, email, confirmPassword, ...all} = req.body

  //HASH PASSWORD

  const hashedPassword = bcrypt.hashSync(password, 10);

  //PASSWORD LENGTH

  if(password.length < 8){
    return res.status(404).send({success: false, message: "Password should be at least 8 characters long"})
  }

  //COMFIRM PASSWORD

  if(password !== confirmPassword){
    return res.status(404).send({success: false, message: "password not the same as confirmPassword"})
  }

  //VALIDATE EMAIL

  if(!validator.isEmail(email)){
    return res.status(404).send({success: false, message: "Invalid email"})
  }

  //CHECK IF EMAIL EXISTS

  const mail = await User.findOne({email:email})

  if(mail){
    return res.status(404).send({success: false, message: "Email already exists"})
  }

  try {

    // CREATE NEW USER

    const user =  new User({email:email, password:hashedPassword, ...all})
    await user.save();
    return res.status(200).send({success: true, message: "user registered successfully"});
    
  } catch (error) {
    console.log(error);
    return res.status(404).send({success: false, message: "User not registered"})
  }
}

export const login = async (req,res) => {

  const {email} = req.body

  try{
    const user = await User.findOne({email:email});
    if(!user){
    return res.status(404).send({success: false, message: "User not found"})
  }

  const iscorrect = bcrypt.compareSync(req.body.password, user.password);
  if(!iscorrect){
    return  res.status(400).send({success: false, message: "Wrong password or email"})
  };

  const {password, ...info} = user._doc

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
  
  res.cookie
  ("accessToken", token, {httpOnly : true}).status(200).json({message: "User successfully login", info});
  
} catch(error){
  console.log(error)
  res.status(500).json("Something went wrong");
}
}

export const logout = async (req,res) => {
  try{

  } catch(error){

  }
}

export const requestPasswordReset = async (req,res) => {
  try{

    const {email} = req.body;

    const user = await User.findOne({email:email});

    console.log(user)

    if(!user){
      return res.status(404).send({success: false, message: "User not found"})
    }

    const secret = process.env.JWT_SECRET + user.password

    const token = jwt.sign({id: user._id, email: user.email}, secret, {expiresIn: '1h'});

    const url = `http://localhost:8800/resetpassword?id=${user._id}&token=${token}`;

    console.log(token)


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      text: `link to reset your password. Click on it, and you will directed to where you have to change your password ${url}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({success: true, message: "Reset Password email sent successfully"})

  } catch(error){
    console.log(error)
    res.status(500).send({ success: false, message: "Something went wrong"});
  }
}

export const resetPassword = async (req, res) => {
  const { id, token } = req.query;

  console.log(`user id ${id}`)
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  try {
    const user = await User.findById(id);
    console.log(user)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const secret = process.env.JWT_SECRET + user.password;

    try {
      jwt.verify(token, secret); // Verify the token with the same secret used during creation
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    // Token is valid; proceed with password reset
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ success: true, message: "Password has been reset successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getUsers = async (req,res) => {
  try{

  } catch(error){

  }
}