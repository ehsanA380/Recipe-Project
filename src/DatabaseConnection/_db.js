import mongoose from "mongoose";
// database connection 
async function db() {
 const connpath ="mongodb+srv://ehsanansari123123:gC6T6n71wzjhhixN@mernstactappdatabase.yprxhlw.mongodb.net/?retryWrites=true&w=majority"
 const conn= await mongoose.connect("mongodb://127.0.0.1:27017/recipes");
 
    if(conn){
        console.log("db connected",mongoose.connection.readyState);
    }
    else{
        console.log("connection denied",mongoose.connection.readyState)
    }

}
export default db

