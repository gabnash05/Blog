import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import useAuthContext from "./hooks/useAuthContext";
import BlogPage from "./pages/BlogPage";
import Signup from "./pages/Signup";
import AccountPage from "./pages/AccountPage";


function App() {

  const { user } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
          <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to='/login'/>} />
            <Route path="/login" element={!user ? <Login/> : <Navigate to='/'/>} />
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to='/'/>} />
            <Route path="/blogs/:blogId" element={!user ? <Login/> : <BlogPage/>} />
            <Route path="/users/:userName" element={!user ? <Login/> : <AccountPage/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
