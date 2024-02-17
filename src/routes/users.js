import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {UserModel} from "../modules/UserModel.js";// use .js extension after User

const router = express.Router();
//router for GUI

router.post("/register",async (req,res)=>{
  const {username , password}=req.body;
  // const user =   await UserModel.insertOne({userame:username,password:password});
  const userDoc = new UserModel({username,password});
  console.log(req.body)
  try{
    const saveData=await userDoc.save();
    if (saveData) {
      console.log("data is saved into the database successfully.");
      res.send(saveData);
    }
  }
  catch(err){
    console.log(`${err}, duplication happens, "username": ${username}, already exist in the data base`);
    res.send(`${err}, duplication happens, "username": ${username}, already exist in the data base`)
  }
  
});

router.get("/login",async (req,res)=>{
   const d = await  UserModel.findOne();
  //  console.log(req.body);
  res.json(d)
})

// export {router as userRouter};
export {router as userRouter}

