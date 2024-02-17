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
  }
},
{
  timestamps: true,
  versionKey: false, // Here You have to add.
}
);

 export const UserModel = mongoose.model('Ehsan', UserSchema);

 