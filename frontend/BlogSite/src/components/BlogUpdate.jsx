import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa";


//Hooks
import useEditBlog from "../hooks/useEditBlog";
import convertToBase64 from "../Util/convertToBase64";


export default function BlogUpdate({ onClose, blog }) {

  const { _id } = blog;
  const { editBlog, isLoading } = useEditBlog();

  const [title, setTitle] = useState(blog.title);
  const [desc, setDesc] = useState(blog.desc);
  const [content, setContent] = useState(blog.content);
  const [selectedImage, setSelectedImage] = useState(null);
  const [img, setImage] = useState(blog.img )
  const [error, setError] = useState(null);

  //Image Max File Size
  const MAX_FILE_SIZE_MB = 0.25;



  //Submit form
  async function handleSubmit(e) {
    e.preventDefault();

    const blog = { title, desc, content, img, _id };

    await editBlog(blog)
    .then(() => {
      onClose();
    })
    .catch ((e) => {
      setError(e.message);
    })
    
  }



  //Image upload
  async function handleImageUpload(e) {
    
    const file = e.target.files[0];
    setSelectedImage(file);
    
    try {
      const base64 = await convertToBase64(file);

      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        setError(`File size should not exceed ${MAX_FILE_SIZE_MB} MB`);
        setSelectedImage(null);
      } 
      else {
        setError(null);
        setImage(base64);
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

          <h3>Edit Post</h3>
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
            <label htmlFor="file" className="custom-upload-btn">Replace Image</label>

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
            <button disabled={isLoading}>Update</button>
          </div>

          {isLoading && <h2 className="loading">Loading...</h2>}
          {error && <span className="blog-post-error">{error}</span>}

        </form>
      </div>

    </div>
  )
}