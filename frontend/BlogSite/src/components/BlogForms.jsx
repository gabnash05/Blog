import { useEffect, useState } from "react"

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
  const [error, setError] = useState(null);



  useEffect(() => {
    setAuthor(user.userName);
  }, [author])



  
  //Submit form
  async function handleSubmit(e) {
    e.preventDefault();

    
    

    await postBlog(author, title, desc, content, selectedImage)
    .then(() => {
      onClose();
    })
    .catch ((e) => {
      setError(e.message);
    })
    
  }



  //Image upload
  function handleImageUpload(e) {
    setSelectedImage(e.target.files[0]);
  }





  return (
    <div>
      <div className="blog-container">
        <form className='post-blog-form' onSubmit={handleSubmit}>
          <button className="close-form" onClick={() => onClose()}>X</button>

          <h3>Post New Blog</h3>
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