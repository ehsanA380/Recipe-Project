import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedRecipes:[{type:mongoose.Schema.Types.ObjectId,
     ref: "recipes"
    } ],
},
{
  // timestamps: true,
  versionKey: false, // Here You have to add.
}
);

 export const UserModel = mongoose.model('users', UserSchema);

 