import express from 'express';
import multer from 'multer'; 
import path from 'path';

import requireAuth from "../middleware/requireAuth.js";

import { getOneBlog, postBlog, deleteBlog, updateBlog, getAllBlogs } from '../controllers/blogController.js';



const blogsRouter = express.Router();

//AUTHENTICATION
blogsRouter.use(requireAuth);



//Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/blogImages')
  }, 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });




//GET ALL BLOGS
blogsRouter.get('/', getAllBlogs);

//GET ONE BLOG
blogsRouter.get('/:id', getOneBlog);

//POST ONE BLOG
blogsRouter.post('/', upload.fields([
  { name: 'img', maxCount: 1 },
  { name: 'data', maxCount: 1 }
]), postBlog);

//DELETE BLOG
blogsRouter.delete('/:id', deleteBlog);

//UPDATE BLOG
blogsRouter.patch('/:id', upload.fields([
  { name: 'img', maxCount: 1 },
  { name: 'data', maxCount: 1 }
]), updateBlog);  


export default blogsRouter;