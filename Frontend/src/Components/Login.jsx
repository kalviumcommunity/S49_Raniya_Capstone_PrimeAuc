import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../Styles/Login.css";
import { UniqueUserBidNo } from './UserBidNoGenerator';


  

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userbid_no:''
  });
  const [passwordError, setPasswordError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const { generateNextNumber, loading } = UniqueUserBidNo();
  useEffect(() => {
    const fetchAndSetBidNo = async () => {
      if (isSignUp) {
        const newBidNo = await generateNextNumber();
        setFormData(prevData => ({ ...prevData, userbid_no: `Biduser_${newBidNo}` }));
      }
    };

    fetchAndSetBidNo();
  }, [isSignUp]);

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlurPassword = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      if (value.trim() === '' || /^(?=.*[0-9]).{6,}$/.test(value)) {
        setPasswordError('');
      } else {
        setPasswordError('Password must contain at least one number and have a minimum length of 6 characters');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (isSignUp) {
        await axios.post('http://localhost:3000/signup', formData);
        setSignupSuccess(true);
        alert('Signup successful!');
      } else {
        console.log("inside data",formData, formData.email);
        var email=formData.email;
        var password=formData.password;
        await axios.post('http://localhost:3000/login', {email,password});
        alert('Login successful!');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert('Error:', error.response.data.error);
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div  className="box">
    <div className="login-page">
      {signupSuccess && (
        <p style={{ color: 'green', textAlign: 'center' }}>Signup successful! You can now login.</p>
      )}
      {/* <h1 style={{ textAlign: "center" }}>{isSignUp ? 'Sign Up' : 'Login'}</h1> */}
      <div className="form">
        <form className='login-form' onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder='Username'
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlurPassword}
            placeholder='Password'
            required={!isSignUp} // Only required for signup
          />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
          <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
          <p className='message'>
            {isSignUp
              ? 'Already registered? '
              : 'Not Registered? '
            }
            <Link to={isSignUp ? "/login" : "/signup"} onClick={handleToggleForm}>
              {isSignUp ? 'Sign in' : 'Create an account'}
            </Link>
          </p>
        </form>
      </div>


      </div>
      </div>
  );
}

export default Login;