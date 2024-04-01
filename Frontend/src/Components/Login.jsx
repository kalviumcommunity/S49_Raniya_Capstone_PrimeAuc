import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "../Styles/Login.css";

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleSignInClick = () => {
    setShowSignUp(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Will connect to backend here
  };

  if (showSignUp) {
    return (
      <div className="login-page">
        <h1 style={{textAlign:"center"}}>Sign Up</h1>
        <div className="form">
          <form className='login-form' onSubmit={handleSubmit}>
            <input type="text" id="" placeholder='Username' />
            <input type="email" id="" placeholder='Email' />
            <input type="password" id="" placeholder='Password' />
            <button type="submit">Sign Up</button>
            <p className='message'>Already registered? <Link to="/login" onClick={handleSignInClick}>Sign in</Link></p>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="login-page">
        <h1 style={{textAlign:"center"}}>Login</h1>
        <div className="form">
          <form className='login-form'>
            <input type="text" id="" placeholder='Username' />
            <input type="password" id="" placeholder='Password' />
            <button>Login</button>
            <p className='message'>Not Registered? <Link to="/signup" onClick={handleSignUpClick}>Create an account</Link></p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
