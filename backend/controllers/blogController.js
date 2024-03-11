import Blogs from "../models/blogModel.js";
import User from "../models/userModel.js";

import mongoose from "mongoose";



export async function getAllBlogs(req, res) {
  const user_id = req.user._id;

  const blogs = await Blogs.find({ user_id }).sort({createdAt: -1});
  
  res.status(200).json(blogs);
}
 
export async function getOneBlog(req, res) {

  const { id } = req.params;
  
  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({error: 'Invalid ID, blog not Found'});
  }

  const blog = await Blogs.findById(id);

  if (!blog) {
    res.status(404).json({error:'Blog not found'});
  }
  
  res.status(200).json(blog);
}

export async function postBlog(req, res) {

  console.log(req.body)

  const { author, title, desc, content, img} = req.body;
  const user_id = req.user._id;

  console.log(req.file);

  try {
    const img = req.file ? req.file.filename : null;

    const blog = await Blogs.postBlog(author, title, desc, img, content, user_id);
    res.status(200).json(blog);

  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
}

export async function deleteBlog(req, res) {
  const { id } = req.params;
  
  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({error: 'Invalid ID, blog not Found'});
  }

  const blog = await Blogs.findOneAndDelete({_id: id})

  if (!blog) {
    res.status(404).json({error: 'Cannot delete, blog not found'});
  }
  
  res.status(200).json(blog);
}

export async function updateBlog(req, res) {

  const { id } = req.params; 
  
  const blog = await Blogs.findOneAndUpdate({_id: id}, { ...req.body })
  
  if (!blog) {
    res.status(404).json({error: 'Cannot update, blog not found'});
  }
  
  res.status(200).json(blog);
}