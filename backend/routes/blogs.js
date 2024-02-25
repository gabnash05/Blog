import express from 'express';
import { getAllBlogs, getOneBlog, postBlog, deleteBlog, updateBlog } from '../controllers/blogController.js';

const blogsRouter = express.Router();

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