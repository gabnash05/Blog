import { Link } from 'react-router-dom'

export default function Navbar() {


  return(
    <nav>
      <div className='navbar'>

        <h2>BLOGPOST</h2>
        <h4>nasayaokim@gmail.com</h4>
        <nav className="nav-button">
          <button>Log Out</button>
        </nav>
        

      </div>
    </nav>
  )
}