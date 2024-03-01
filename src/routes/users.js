import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserModel} from '../models/Users.js' // dont forget to add .js extension other wise it throw an error 

const router = express.Router();


// api for registration ______________________________
router.post('/register', async (req,res)=>{
  const {username, password} = req.body;
  const user = await UserModel.findOne({username});
  if(user){
    return res.json({message:"user already exists!"})
  }
  // encrypting the password
  const hashedPassword = await bcrypt.hash(password,10);
// saving the document into the database {username,password}
  const newUser = new UserModel({username,password: hashedPassword});
  await newUser.save();
  res.json({message:"User Registered Successfully."})
})


// Api for login -________________________________________
router.post('/login', async (req,res)=>{
  const {username,password}=req.body;
  const user = await UserModel.findOne({username});
  if(!user){
    return res.json({message:"User doesn't Exists!",loggedStatus:false})
  }
// checking the password
  const isPasswordValid = await bcrypt.compare(password,user.password);
  if(!isPasswordValid){
    return res.json({message:"Username or Password Is Incorret!",loggedStatus:false})
  }
  // generating token
  if(user){
    const token = jwt.sign({id:user._id},"secrect")
    res.json({token,userID:user._id,name:user.username,message:"logged in successfully!",loggedStatus:true})

  }
});

// exporting the router with alias userRouter

export {router as userRouter}

export const verifyToken = (req, res, next ) =>{
  const token = req.headers.authorization;
  if(token){
    jwt.verify(token,"secrect",(err)=>{
      if(err){
        //  return ()
        alert("athentication failed!")
        return res.sendStatus(403)
      }
      next();
    })
  }else{
    console.log('authorization failed');
    res.sendStatus(401)
  }
}


















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

