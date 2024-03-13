import express from "express";
import multer from 'multer'; 
import path from 'path';


import { signUpUser, logInUser, updateUser, updatePassword } from "../controllers/userController.js";
import requireAuth from "../middleware/requireAuth.js";


const usersRouter = express.Router();


//Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/userImages')
  }, 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });


//SIGNUP
usersRouter.post('/signup', signUpUser);
//LOGIN
usersRouter.post('/login', logInUser);
//GET SINGLE ACCOUNT
usersRouter.patch('/:email', requireAuth, updatePassword, upload.fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'data', maxCount: 1 }
]), updateUser);

export default usersRouter;