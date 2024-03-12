import User from "../models/userModel.js";
import Blogs from "../models/blogModel.js";
import jwt from "jsonwebtoken";


function createToken(_id) {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
} 


export async function signUpUser(req, res) {

  const { userName, email, password} = req.body;
  const profilePic = null;
  const blogDesc = null;

  try {
    const user = await User.signup(userName, email, password, profilePic, blogDesc);

    const token = createToken(user._id);
    

    res.status(200).json({userName, email, token});

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


export async function logInUser(req, res) {

  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const { userName, profilePic, blogDesc } = user;

    const token = createToken(user._id);
    res.status(200).json({userName, email, profilePic, blogDesc, token});
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


export async function updateUser(req, res) {
  console.log(req.body)

  try {
    const email = req.params.email;

    const update = req.body

    const account = await User.findOneAndUpdate({ email }, { ...update });
    
    res.status(200).json(account);
  }
  catch (error) {
    res.status(400).json({error: error.message});
  }
}