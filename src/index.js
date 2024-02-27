import express from "express";
import cors from "cors";
import db from './DatabaseConnection/_db.js'
import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";

const app = express();
db();

app.use(express.json());
app.use(cors());

app.use("/auth",userRouter);
app.use("/recipes",recipeRouter);

 
 app.listen(3001,()=>console.log("server started."));
