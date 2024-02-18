import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserModel} from '../modules/UserModel.js' // dont forget to add .js extension other wise it throw an error 

const router = express.Router();

router.post('/register', async (req,res)=>{
  const {username, password} = req.body;
  const user = await UserModel.findOne({username});
  if(user){
    return res.json({message:"user already exists!"})
  }
   
  // decritpting the password
  const hashedPassword = await bcrypt.hash(password,10);

  const newUser = new UserModel({username,password: hashedPassword});
  await newUser.save();

  res.json({message:"User Registered Successfully."})
})

router.post('/login', async (req,res)=>{
  const {username,password}=req.body;
  const user = await UserModel.findOne({username});

  if(!user){
    return res.json({message:"User doesn't Exists!"})
  }

  const isPasswordValid = await bcrypt.compare(password,user.password);

  if(!isPasswordValid){
    return res.json({message:"Username or Password Is Incorret!"})
  }
  const token = jwt.sign({id:user._id},"secrect")
  res.json({token,userID:user._id})


})

export {router as userRouter}






















//_______________________________________________________________________________________________________________________________________________

// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import {UserModel} from "../modules/UserModel.js";// use .js extension after User

// const router = express.Router();
// //router for GUI

// router.post("/register",async (req,res)=>{
//   const {username , password}=req.body;
//   // const user =   await UserModel.insertOne({userame:username,password:password});
//   const userDoc = new UserModel({username,password});
//   console.log(req.body)
//   try{
//     const saveData=await userDoc.save();
//     if (saveData) {
//       console.log("data is saved into the database successfully.");
//       res.send(saveData);
//     }
//   }
//   catch(err){
//     console.log(`${err}, duplication happens, "username": ${username}, already exist in the data base`);
//     res.send(`${err}, duplication happens, "username": ${username}, already exist in the data base`)
//   }
  
// });

// router.get("/login",async (req,res)=>{
//    const d = await  UserModel.findOne();
//   //  console.log(req.body);
//   res.json(d)
// })

// // export {router as userRouter};
// export {router as userRouter}

