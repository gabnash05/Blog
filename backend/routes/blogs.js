import express from 'express';
import { getOneBlog, postBlog, deleteBlog, updateBlog, getAllBlogs } from '../controllers/blogController.js';
import requireAuth from "../middleware/requireAuth.js";


const blogsRouter = express.Router();


//AUTHENTICATION
//blogsRouter.use(requireAuth);


//GET ALL BLOGS
blogsRouter.get('/', getAllBlogs);
//GET ONE BLOG
blogsRouter.get('/:id', getOneBlog);
//POST ONE BLOG
blogsRouter.post('/', postBlog);
//DELETE BLOG
blogsRouter.delete('/:id', deleteBlog);
//UPDATE BLOG
blogsRouter.patch('/:id', updateBlog);


export default blogsRouter;