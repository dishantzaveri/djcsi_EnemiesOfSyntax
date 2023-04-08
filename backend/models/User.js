import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 50
    },
    email: {
      type: String,
      max: 50,
      unique: true
    },
    password: {
      type: String
    },
    picturePath: {
      type: String,
      default: ''
    },
    friends: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
