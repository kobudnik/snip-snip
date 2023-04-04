import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useUsername } from '../ContextProviders';

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { username, setUsername, isAuthenticated, setAuthenticated } =
    useUsername();

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username }),
  };

  useEffect(() => {
    if (isAuthenticated && username) {
      navigate('/home');
    } else if (username) {
      fetch('/api/session/checkStatus', requestOptions)
        .then((session) => {
          if (!session.ok) {
            throw { message: 'HTTP error, status = ' + session.status };
          }
          setAuthenticated(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [isAuthenticated, username]);

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

      if (!post.ok) {
        throw { message: 'HTTP error, status = ' + response.status };
      }
      const { username } = await post.json();
      setUsername(username);
      localStorage.setItem('username', username);
      setAuthenticated(true);
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
