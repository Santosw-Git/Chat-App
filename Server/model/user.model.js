import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String, 
      required: true,
    },
    username: {
      type: String, 
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    gender: {
      type: String, 
      required: true,
      enum: ['boy', 'girl'],
    },
    profile_pic: {
      type: String, 
      default: '',
    },
  },
  { timestamps: true } 
);

const User = mongoose.model('User', userSchema);

export default User;
