import { useContext } from "react"
import { BlogsContext } from "../contexts/blogsContext"

export default function useBlogsContext() {

  const blogs = useContext(BlogsContext);

  if (!blogs) {
    throw Error('useBlogsContext must be used within BlogsContextProvider');
  }

  return blogs;
}