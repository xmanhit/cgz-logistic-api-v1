import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  nationalId: {
    type: String,
    required: false,
  },
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;