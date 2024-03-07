import useAuthContext from "./useAuthContext";
import useBlogsContext from "./useBlogsContext";

export default function useLogout() {
  const { dispatch } = useAuthContext();
  const { dispatch: blogsDispatch } = useBlogsContext();
  
  const logout = () => {
    localStorage.removeItem("user");
    
    dispatch({ type: "LOGOUT"});
    blogsDispatch({ type: "SET_BLOGS", payload: null})
  }

  return {logout};
}