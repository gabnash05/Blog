import { useEffect, useState } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';

//Context
import useAuthContext from '../hooks/useAuthContext';

//Components
import AccountUpdate from '../components/AccountUpdate';


export default function AccountPage() {

  const { user } = useAuthContext();
  
  const [isUpdatingAccount, setIsUpdatingAccount] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  function closeUpdateScreens() {
    setIsUpdatingAccount(false);
    setIsUpdatingPassword(false);
  };

  function handleEditButton() {
    setIsUpdatingAccount(true);
  }
  
  return (
    <div>
      {isUpdatingAccount ? 
        <AccountUpdate onClose={closeUpdateScreens} />
        :
        <></>
      }
      {isUpdatingPassword ? 
        <PasswordUpdate onClose={closeUpdateScreens} />
        :
        <></>
      }
      <div className="account-page">
        

        <img src={`http://localhost:4500/userImages/${user.profilePic}`}></img>

        <h1>{`${user.userName}`}</h1>
        <label>Username</label>

        <h2>{`${user.email}`}</h2>
        <label>Email</label>

        <h3>{`${user.blogDesc}`}</h3>
        <label>Blog Description</label>

        <div className='account-controllers'>
          <button className='edit-details' onClick={handleEditButton}>Edit Account Details</button>
          <button className='edit-password'>Change Password</button>
        </div>
      </div>
    </div>
  )
}