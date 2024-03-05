import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import useAuthContext from "./hooks/useAuthContext";

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
