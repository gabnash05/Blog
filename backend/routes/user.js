import express from "express";
import { signUpUser, logInUser, getAllUsers, getUserBlogs } from "../controllers/userController.js";


const usersRouter = express.Router();


//SIGNUP
usersRouter.post('/signup', signUpUser);
//LOGIN
usersRouter.post('/login', logInUser);
//GET ALL BLOGS FROM USER
usersRouter.get('/:id', getUserBlogs);

//TESTING
usersRouter.get('/login', getAllUsers);

export default usersRouter;