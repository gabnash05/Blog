import mongoose from "mongoose";
import validator from "validator";
import bycrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }, 
  password: {
    type: String,
    required: true
  }
});


//SIGN UP FUNCTION
userSchema.statics.signup = async function(userName, email, password) {

  //validation
  if (!userName || !email || !password) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  if (!validator.isStrongPassword) {
    throw Error('Password is not strong enough');
  }

  //check if email is unique
  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error('Email already in use');
  }

  //password hashing 
  const salt = bycrypt.genSalt(10);
  const hash = bycrypt.hash(password, salt);

  const user = await User.create({ userName, email, password: hash});

  return user;
}


//LOGIN FUNCTION
userSchema.statics.login = async function(userName, email, password) {

  //validation
  if (!userName || !email || !password) {
    throw Error('All fields must be filled');
  }

  //check if email is correct
  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email');
  }

  //compare password
  const passwordMatch = await bycrypt.compare(password, user.password);

  if (!password) {
    throw Error('Incorrect password');
  }

  return user;
}


const User = mongoose.model('User', userSchema);

export default User;