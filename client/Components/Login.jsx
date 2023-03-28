import React, { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const sendLogin = async (e) => {
    e.preventDefault();
    setError(false);
    const data = new FormData(e.target);
    const username = data.get('username');
    const password = data.get('password');

    console.log(username, password);
    const loginBody = JSON.stringify({ username, password });

    const post = await fetch('/api/session', {
      method: 'POST',
      body: loginBody,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (post.status === 200) {
      console.log('routing to home!');
      navigate('/home');
    } else {
      setError(true);
    }
  };
  return (
    <>
      <div className='standard-body'>
        <div className='standard-title'>
          <h1>Welcome to Snip-Snip!</h1>
        </div>
        <form
          className='standard-form'
          role='form'
          action='/api/login'
          onSubmit={sendLogin}
        >
          <input
            className='standard-input'
            aria-label='login-username-input'
            placeholder='username'
            type='text'
            name='username'
          />
          <input
            className='standard-input'
            aria-label='login-password-input'
            placeholder='password'
            type='password'
            name='password'
          />
          <button className='standard-button' type='submit'>
            Submit
          </button>
          {error && <div>Failed to login...Please check your credentials</div>}
        </form>
        <Link to={'create'} id='standard-rdr'>
          New here? Create an Account
        </Link>
      </div>
    </>
  );
};

export default Login;
