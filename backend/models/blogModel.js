import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  authorProfilePic: {
    type: [],
    required: false
  }, 
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }, 
  file: {
    type: [],
  }, 
  user_id: {
    type: String,
    required: true
  }
}, {timestamps: true});


const Blogs = mongoose.model('Blogs', BlogSchema);

export default Blogs;