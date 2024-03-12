import { useEffect, useState } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';

//Context
import useAuthContext from '../hooks/useAuthContext';

//Components
import AccountUpdate from '../components/AccountUpdate';


export default function AccountPage() {

  const { user } = useAuthContext();
  
  const [isUpdating, setIsUpdating] = useState(false);

  function closeAccountUpdate() {
    setIsUpdating(false);
  };

  function handleEditButton() {
    setIsUpdating(true);
  }
  
  return (
    <div>
      {isUpdating ? 
        <AccountUpdate onClose={closeAccountUpdate} />
        :
        <></>
      }
      <div className="account-page">
        

        <img src={user.profilePic}></img>

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