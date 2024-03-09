import mongoose from "mongoose";

const Schema = mongoose.Schema; 

const blogSchema = new Schema({
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
  desc: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }, 
  img: {
    type: String,
  }, 
  user_id: {
    type: String,
    required: true
  }
}, {timestamps: true});



//POST BLOG FUNCTION
blogSchema.statics.postBlog = async function(author, title, desc, img, content, user_id) {

  //validation
  if (!title) {
    throw Error('Blog title is empty');
  }
  if (!desc) {
    throw Error('Blog description is empty');
  }
  if (!content) {
    throw Error('Blog content is empty');
  }

  const blog = await Blogs.create({ author, title, desc, img, content, user_id });

  return blog;
}


const Blogs = mongoose.model('Blogs', blogSchema);

export default Blogs;