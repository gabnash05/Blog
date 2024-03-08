import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      console.log(blog)
    }

  }, [user]);

  return(
    <div>
      {blog ? (
        <div className="blog-page">
          <img src={blog.img}></img>
          <h1>{blog.title}</h1>
          <h4>{blog.desc}</h4>
          <p><pre id="output">{blog.content}</pre></p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}