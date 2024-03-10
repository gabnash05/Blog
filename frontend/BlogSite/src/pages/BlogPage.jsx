import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";

//Components
import BlogUpdate from "../components/BlogUpdate";

//Context
import useBlogsContext from "../hooks/useBlogsContext";
import useAuthContext from "../hooks/useAuthContext";

export default function BlogPage() {

  const [blog, setBlog] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

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

  }, [user, isUpdating]);


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
    setIsUpdating(true);
  }

  //close blog update component
  function closeBlogUpdate() {
    setIsUpdating(false);
  };



  return(
    <div>
      {isUpdating ? 
            <BlogUpdate onClose={closeBlogUpdate} blog={blog}/>
            :
            <></>
      }

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
        <h2 className="loading-blog-page">Loading...</h2>
      )}
    </div>
  )
}