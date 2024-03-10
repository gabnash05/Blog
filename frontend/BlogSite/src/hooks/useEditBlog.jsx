import { useState } from "react";

//Hooks
import useBlogsContext from "./useBlogsContext";
import useAuthContext from "./useAuthContext";



export default function useEditBlog() {

  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useBlogsContext();
  const { user } = useAuthContext();



  async function editBlog({ title, desc, content, img, _id }) {
    setIsLoading(true);

    const blog = { title, desc, content, img };

    const response = await fetch(`http://localhost:4500/api/blogs/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      throw Error(json.error);
    }

    if (response.ok) {
      dispatch({type: 'UPDATE_BLOG', payload: json});
      setIsLoading(false);
    }
  }




  return { editBlog, isLoading };
}