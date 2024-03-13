import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

//Hooks
import useAuthContext from "./useAuthContext";
import useLogout from './useLogout'



export default function useUpdatePassword() {

  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);
  const [isVerifiedPassword, setIsVerifiedPassword] = useState(false)

  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();


  const client = axios.create({
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
  


  async function updatePassword(update) {

    setIsLoading(true);

    const password = { password: update }

    try {
      const response = await client.patch(`http://localhost:4500/api/users/${user.email}`, password); 
      setIsLoading(false);
      logout();
    }
    catch (error) {
      setIsLoading(false);
      console.log(error);
    }
 
  }

  async function verifyPassword(password) {

    setIsLoading(true); 
    setIsVerifyingPassword(true);

    const verify = { password, email: user.email }

    try {
      //Verify password request
      await axios.post(`http://localhost:4500/api/users/login`, verify);

      setIsVerifyingPassword(false);
      setIsLoading(false); 
      setIsVerifiedPassword(true);
      return true;
    }
    catch (error) {
      setIsVerifyingPassword(false);
      setIsLoading(false);
      console.log(error);
      return false;
    }
 
  }


  return { updatePassword, verifyPassword, isLoading, isVerifyingPassword, isVerifiedPassword };
}