import { useState } from "react"


//Hooks
import useSignup from "../hooks/useSignup";



export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const { signup, isLoading, error } = useSignup();


  async function handleSignupForm(e) {
    e.preventDefault();

    await signup(userName, email, password);
  }


  return (
    <form className="signup" onSubmit={handleSignupForm}>
      <h3>Signup</h3>

      <div>
        <label>Username</label>
        <input 
          type="text" 
          onChange={e => setUserName(e.target.value)} 
          value={userName} 
        />
      </div>

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

      <section className="signup-button">
        <button disabled={isLoading}>Signup</button>
      </section>

      {error && <p className="error">{error}</p>}

      
      
    </form>
  )
}