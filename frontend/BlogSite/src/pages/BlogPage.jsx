import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";

//Context
import useBlogsContext from "../hooks/useBlogsContext";
import useAuthContext from "../hooks/useAuthContext";

export default function BlogPage() {

  const [blog, setBlog] = useState(null);

  const { blogId } = useParams();
  const { dispatch } = useBlogsContext();
  const { user } = useAuthContext();
  
  useEffect(() => {
    async function fetchBlog() {
      const response = await fetch(`http://localhost:4500/api/blogs/${blogId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.error);
      }

      if (response.ok) {
        setBlog(json);
      }
    }
    
    if (user) {
      fetchBlog();
    }

  }, [user]);


  async function handleDeleteButton() {
    
    try {
      const response = await fetch(`http://localhost:4500/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        throw Error(json.error);
      }
  
      if (response.ok) {
        dispatch({ type: 'DELETE_BLOG', payload: json });
      }
    } 
    
    catch (error) {
      console.error('Error deleting blog:', error.message);
    }
  }

  function handleEditButton() {

  }



  return(
    <div>
      {blog ? (
        <div className="blog-page">
          <div className="blog-controllers">
            <button className='edit' onClick={handleEditButton}><FaPencilAlt /></button>
            <Link to='/'><button className='delete' onClick={handleDeleteButton}><FaTrash /></button></Link>
          </div>
          
          <img src={blog.img}></img>
          <h1>{blog.title}</h1>
          <h4>{blog.desc}</h4>
          <p>{blog.content}</p>
        </div>
      ) : (
        <h2 className="no-blogs">Loading...</h2>
      )}
    </div>
  )
}