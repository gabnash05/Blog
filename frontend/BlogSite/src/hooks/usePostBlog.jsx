import { useState } from "react";
import axios from 'axios';

//Hooks
import useBlogsContext from "./useBlogsContext";
import useAuthContext from "./useAuthContext";



export default function usePostBlog() {

  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useBlogsContext();
  const { user } = useAuthContext();

  const client = axios.create({
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${user.token}`
    },
  });


  async function postBlog(blog) {
    setIsLoading(true);

    try {
      const response = await client.post(`http://localhost:4500/api/blogs`, blog);
      const blogData = response.data;

      dispatch({type: 'CREATE_BLOG', payload: blogData});
      setIsLoading(false);
    }
    catch (error) {
      setIsLoading(false);
      throw Error(error);
    }
  }




  return { postBlog, isLoading };
}