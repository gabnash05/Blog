import express from "express";
import { signUpUser, logInUser, updateUser } from "../controllers/userController.js";


const usersRouter = express.Router();


//SIGNUP
usersRouter.post('/signup', signUpUser);
//LOGIN
usersRouter.post('/login', logInUser);
//GET SINGLE ACCOUNT
usersRouter.get('/accounts/:email', updateUser)

export default usersRouter;