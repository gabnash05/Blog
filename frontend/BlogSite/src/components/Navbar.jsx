import { Link } from 'react-router-dom';

import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';

export default function Navbar() {

  const { user } = useAuthContext();
  const { logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return(
    <nav>
      <div className='navbar'>

        <h2><Link to='/'>BLOGPOST</Link></h2>

        {user ? 
        <div className='logged-in'>
          <h4>{user.email}</h4>
          <nav className="nav-button">
            <Link to='/login'><button onClick={handleLogout}>Log Out</button></Link>
          </nav>
        </div>
        :
          <div className='logged-out'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </div>
        }
        
        

      </div>
    </nav>
  )
}