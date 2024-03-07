import { useState } from "react"
import useLogin from "../hooks/useLogin";


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();


  async function handleLoginForm(e) {
    e.preventDefault();

    await login(email, password);
  }


  return (
    <form className="login" onSubmit={handleLoginForm}>
      <h3>Login</h3>

      <label>Email</label>
      <input 
        className="login-email" 
        type="text" 
        onChange={e => setEmail(e.target.value)} 
        value={email} 
      />

      <label>Password</label>
      <input 
        className="login-password" 
        type="password" 
        onChange={e => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
  
    </form>
  )
}