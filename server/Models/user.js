import mongoose from "mongoose";
const Schema=mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["doctor", "patient", "admin"],
    required: true,
  },
  pwd: {
    type: Boolean,
    default: false,
  },

  // ✅ OPTIONAL FIELDS
  age: {
    type: Number,
  },
  bloodGroup: {
    type: String,
  },
  licenseNumber: {
    type: String,
  },
});
const UserModel=mongoose.model('user',UserSchema);
export default UserModel;