const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 30,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: true,
      minLength: 4,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    contractNumber: {
      type: String,
    },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, 'jwtPrivateKey');
  return token;
};

const User = model('User', userSchema);
module.exports = User;
