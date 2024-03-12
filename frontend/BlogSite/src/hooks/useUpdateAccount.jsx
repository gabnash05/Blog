import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

//Hooks
import useAuthContext from "./useAuthContext";
import useLogout from './useLogout'



export default function useUpdateAccount() {

  const [isLoading, setIsLoading] = useState(false);

  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();


  const client = axios.create({
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${user.token}`
    }
  })
  


  async function updateAccount(update) {

    setIsLoading(true); 

    const data = JSON.parse(update.get('data'));

    try {
      const response = await client.patch(`http://localhost:4500/api/users/${data.email}`, update); 
      const accountData = response.data;

      console.log(accountData)

      dispatch({type: 'LOGIN', payload: accountData});
      setIsLoading(false);
      
      logout();
    }
    catch (error) {
      setIsLoading(false);
      console.log(error);
    }
 
  }


  return { updateAccount, isLoading };
}