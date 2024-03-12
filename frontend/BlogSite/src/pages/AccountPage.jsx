import { useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

//Context
import useAuthContext from '../hooks/useAuthContext';


export default function AccountPage() {

  const { user } = useAuthContext();
  
  
  return (
    <div className="account-page">

      <img src={user.profilePic}></img>

      <h1>{`${user.userName}`}</h1>
      <label>Username</label>

      <h2>{`${user.email}`}</h2>
      <label>Email</label>

      <h3>{`${user.blogDesc}`}</h3>
      <label>Blog Description</label>

      <div className='account-controllers'>
        <button className='edit-details'>Edit Account Details</button>
        <button className='edit-password'>Change Password</button>
      </div>
    </div>
  )
}