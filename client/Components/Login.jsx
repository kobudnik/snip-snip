import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useUsername } from '../ContextProviders/UserProvider';

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
      navigate('/default');
    } else if (username) {
      fetch('/api/session/checkStatus', requestOptions)
        .then((session) => {
          if (!session.ok) {
            throw { message: 'HTTP error, status = ' + session.status };
          } else {
            setAuthenticated(true);
          }
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
        throw { message: 'HTTP error, status = ' + post.status };
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

//need to automatically add default folder every time new user is created and insert it in database folders table automatically (trigger function)
//need to update addfolders fetch to grab name from an input and submit it.
//same for delete
//then need to add a get to get all the folders and display them and store in state
//on click will go to the nested route
//where we will display all the snippets for that folder in state
