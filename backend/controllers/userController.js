import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


function createToken(_id) {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
} 


export async function signUpUser(req, res) {

  const { userName, email, password } = req.body;

  try {
    const user = await User.signup(userName, email, password);

    const token = createToken(user._id);
    res.status(200).json({userName, email, token});

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export async function logInUser(req, res) {

  const { userName, email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({userName, email, token});

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}