import Home from "./pages/Home"
import Navbar from "./components/Navbar"

function App() {

  return (
    <div>
      <Navbar />
      <div className="pages">
        <Home />
      </div>
    </div>
  )
}

export default App
