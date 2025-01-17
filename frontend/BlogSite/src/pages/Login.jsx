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

      <div>
        <label>Email</label>
        <input 
          type="text" 
          onChange={e => setEmail(e.target.value)} 
          value={email} 
        />
      </div>
      
      <div>
        <label>Password</label>
        <input 
          type="password" 
          onChange={e => setPassword(e.target.value)} 
          value={password} 
        />
      </div>

      <section className="login-button">
        <button disabled={isLoading}>Login</button>
      </section>

      {error && <p className="error">{error}</p>}

      
      
    </form>
  )
}