import express from "express";
import { signUpUser, logInUser, getAllUsers } from "../controllers/userController.js";


const usersRouter = express.Router();


//SIGNUP
usersRouter.post('/signup', signUpUser);
//LOGIN
usersRouter.post('/login', logInUser);

//TESTING
usersRouter.get('/login', getAllUsers);

export default usersRouter;