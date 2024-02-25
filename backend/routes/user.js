import express from "express";
import { signUpUser, logInUser } from "../controllers/userController.js";

const usersRouter = express.Router();

//SIGNUP
usersRouter.post('/signup', signUpUser);
//LOGIN
usersRouter.post('/login', logInUser);

export default usersRouter;