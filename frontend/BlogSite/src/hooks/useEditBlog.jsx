import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

//Hooks
import useBlogsContext from "./useBlogsContext";
import useAuthContext from "./useAuthContext";



export default function useEditBlog() {

  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useBlogsContext();
  const { user } = useAuthContext();
  const { blogId } = useParams();

  const client = axios.create({
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${user.token}`
    }
  });


  async function editBlog(blog) {
    setIsLoading(true); 

    try {
      const response = await client.patch(`http://localhost:4500/api/blogs/${blogId}`, blog);
      const blogData = response.data;
      
      dispatch({type: 'UPDATE_BLOG', payload: blogData});
      setIsLoading(false);
    }
    catch (error) {
      setIsLoading(false);
      throw Error(error);
    }
 
  }




  return { editBlog, isLoading };
}