import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useUsername } from '../contextProviders';

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { setUsername } = useUsername();

  useEffect(() => {
    try {
      fetch('/api/session/checkStatus')
        .then((user) => user.json())
        .then(({ username }) => {
          setUsername(username);
          navigate('/home');
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const sendLogin = async (e) => {
    e.preventDefault();
    setError(false);
    const data = new FormData(e.target);
    const username = data.get('username');
    const password = data.get('password');
    const loginBody = JSON.stringify({ username, password });
    try {
      const post = await fetch('/api/session', {
        method: 'POST',
        body: loginBody,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const { username } = await post.json();
      setUsername(username);
      navigate('/home');
    } catch (e) {
      console.log(e.message);
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
