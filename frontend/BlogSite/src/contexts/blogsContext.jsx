import { createContext, useReducer } from "react";

export const BlogsContext = createContext();

function blogsReducer(state, action) {
  switch(action.type) {
    case "SET_BLOGS":
      return {
        blogs: action.payload 
      }
    case "CREATE_BLOG":
      return {
        blogs: [ action.payload, ...state.blogs ]
      }
    case "DELETE_BLOG":
      return {
        blogs: state.blogs.filter(b => b._id !== action.payload._id)
      }
    case "UPDATE_BLOG":
      return {
        blogs: state.blogs.map(b => b._id === action.payload._id ? action.payload : b)
      }
    default:
      return state;
  }
}

export function BlogsContextProvider({ children }) {
  const [state, dispatch] = useReducer(blogsReducer, {
    blogs: null
    })
  
  return (
    <BlogsContext.Provider value={{...state, dispatch}}>
      { children }
    </BlogsContext.Provider>
  )
}