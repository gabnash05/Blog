import express from 'express';
import { getAllBlogs, getOneBlog, postBlog, deleteBlog, updateBlog } from '../controllers/blogsController.js';

const blogsRouter = express.Router();

blogsRouter.get('/', getAllBlogs);

blogsRouter.get('/:id', getOneBlog);

blogsRouter.post('/', postBlog);

blogsRouter.delete('/:id', deleteBlog);

blogsRouter.patch('/:id', updateBlog);


export default blogsRouter;