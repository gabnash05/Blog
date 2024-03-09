  import { useState } from "react";

  //Hooks
  import useBlogsContext from "./useBlogsContext";
  import useAuthContext from "./useAuthContext";



  export default function usePostBlog() {

    const [isLoading, setIsLoading] = useState(false);

    const { dispatch } = useBlogsContext();
    const { user } = useAuthContext();



    async function postBlog(author, title, desc, content, img) {
      setIsLoading(true);

      const blog = { author, title, desc, content, img};

      const response = await fetch('http://localhost:4500/api/blogs', {
        method: 'POST',
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
        dispatch({type: 'CREATE_BLOG', payload: json});
        setIsLoading(false);
      }
    }




    return { postBlog, isLoading };
  }