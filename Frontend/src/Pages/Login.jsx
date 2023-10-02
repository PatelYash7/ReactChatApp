import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";



function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    // console.log(displayName + email + password + file);
    try {
      // This method Signs in the user
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      console.log(err)
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>

          <input required type="email" placeholder="E-mail" />
          <input required type="password" placeholder="Password" />
          <button >Sign in</button>

          {err && <span>Something went wrong !! Try Again</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>

  )
}

export default Login