import { useState } from "react";
import useAuthContext from "./useAuthContext";

export default function useLogin() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  async function login(email, password) {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:4500/api/users/login', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({email, password})
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));

      dispatch({type: 'LOGIN', payload: json})

      setIsLoading(false);
    }
  }

  return { login, isLoading, error};
}