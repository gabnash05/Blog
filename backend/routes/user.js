import express from "express";
import { signUpUser, logInUser, updateUser } from "../controllers/userController.js";
import requireAuth from "../middleware/requireAuth.js";


const usersRouter = express.Router();


//SIGNUP
usersRouter.post('/signup', signUpUser);
//LOGIN
usersRouter.post('/login', logInUser);
//GET SINGLE ACCOUNT
usersRouter.patch('/:email', requireAuth, updateUser);

export default usersRouter;