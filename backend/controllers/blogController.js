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

  try {
    const { author, title, desc, content } = JSON.parse(req.body.data);
    const user_id = req.user._id;

    let img = null;



    //Check if image is sent
    if (req.files.img) {
      //Check if image already exists
      if (req.existingImage) {
        img = req.imageFilename;
      } 
      else {
        img = req.files.img[0].filename;
      }
    } else {
      img = null;
    }

    
    

    const data = { author, title, desc, content, user_id, img };

    const blog = await Blogs.postBlog(data);
    res.status(200).json(blog);

  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
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
  const { title, desc, content } = JSON.parse(req.body.data);
  let img = null;
  let update;


  //Update validation
  if (!title) {
    return res.status(400).json({error: 'Cannot leave title blank'});
  }
  if (!desc) {
    return res.status(400).json({error: 'Cannot leave description blank'});
  }
  if (!content) {
    return res.status(400).json({error: 'Cannot leave content blank'});
  }


  if (req.files.img) {

    //Check if image already exists
    if (req.existingImage) {
      img = req.imageFilename;
    } else {
      img = req.files.img[0].filename
    }
    update = { title, desc, content, img }
    
  } 
  else {
    update = { title, desc, content }
  }


  try {
    const blog = await Blogs.findOneAndUpdate({_id: id}, { ...update });
    res.status(200).json(blog);
  }
  catch (error) {
    res.status(404).json({error: 'Cannot update, blog not found'});
  }
  
}