import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa";


//Hooks
import useAuthContext from "../hooks/useAuthContext";
import usePostBlog from "../hooks/usePostBlog";


export default function BlogForms({ onClose }) {

  const { user } = useAuthContext();
  const { postBlog, isLoading } = usePostBlog();

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null);

  //Image Max File Size
  const MAX_FILE_SIZE_MB = 5;


  useEffect(() => {
    setAuthor(user.userName);
  }, [author])



  //Submit form
  async function handleSubmit(e) {
    e.preventDefault();

    const data = { author, title, desc, content };

    //append all data to a formData
    const blog = new FormData();
    blog.append('img', image);
    blog.append('data', JSON.stringify(data));

    await postBlog(blog)
    .then(() => {
      onClose();
    })
    .catch ((error) => {
      setError(error.message);
    })
    
  }


  //Image upload
  async function handleImageUpload(e) {
    
    const file = e.target.files[0];
    setSelectedImage(file);
    
    try {

      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        setError(`File size should not exceed ${MAX_FILE_SIZE_MB} MB`);
        setSelectedImage(null);
      } 
      else {
        setError(null);
        setImage(file);
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <div className="blog-container">
        <form className='post-blog-form' onSubmit={handleSubmit}>
          <button className="close-form" onClick={() => onClose()}><FaTrash/></button>

          <h3>Add New Post</h3>
          <br></br>

          <div>
            <label>Title</label>
            <input 
              type="text"
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div>
            <label>Blog Image</label>
            <label htmlFor="file" className="custom-upload-btn">Upload Image</label>

            <input
              className="img-input"
              type="file"
              id="file"
              accept=".jpeg, .png, .jpg"
              onChange={handleImageUpload}
            />
            <div></div>

            {selectedImage && <span className="file-label">{selectedImage.name}</span>}
          </div>

          <div>
            <label>Description</label>
            <textarea
              className="desc-input"
              rows={1}
              onChange={e => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          
          <div>
            <label>Content</label>
            <textarea
              className="content-input"
              rows={10}
              onChange={e => setContent(e.target.value)}
              value={content}
            />
          </div>
          
          <div className="blogControls">
            <div></div>
            <button disabled={isLoading}>Post</button>
          </div>

          {error && <span className="blog-post-error">{error}</span>}

        </form>
      </div>

    </div>
  )
}