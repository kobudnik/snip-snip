import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUsername } from '../Providers/UserProvider';
import scissorsImage from '../Images/scissors.png';

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

  const handleFocus = (e) => {
    e.target.placeholder = '';
    setError(false);
  };

  const handleBlur = (e) => {
    e.target.placeholder = e.target.name;
  };

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
      <div className='bg-gray-900 flex flex-col bg-gray-900 align-center h-screen'>
        <div className='flex justify-center'>
          <h1 className='text-5xl font-bold m-0 mt-16'>
            Welcome to Snip Snip!
          </h1>
        </div>
        <div className='flex flex-col items-center justify-center flex-grow pb-48 font-poppins text-lg '>
          <img
            className='inline-block mb-4'
            src={scissorsImage}
            alt='scissors-image'
            height='200px'
            width='250px'
          />
          <form
            className='flex flex-col items-center justify-between h-60 rounded-3xl  w-96 m-0 mb-7'
            onSubmit={sendLogin}
          >
            <input
              type='text'
              placeholder='username'
              className='rounded-3xl py-3 my-4 w-80 text-center outline-none'
              aria-label='login-username-input'
              name='username'
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type='password'
              placeholder='password'
              className=' rounded-3xl py-3 mb-4 w-80 text-center outline-none'
              name='password'
              aria-label='login-password-input'
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button
              className='bg-pink-600 text-white text-xl rounded-xl w-full h-14 hover:bg-pink-500'
              aria-label='login-submit-button'
            >
              Sign in
            </button>
          </form>
          <div className='text-white text-center'>
            New here?{' '}
            <Link
              to='/signup'
              className='underline hover:text-gray-300 text-lg'
            >
              Create an account
            </Link>
          </div>
          {error && (
            <div className='text-red-400 mt-3'>
              Failed to login... Please check your credentials.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;

//need to update addfolders fetch to grab name from an input and submit it.
//same for delete
//then need to add a get to get all the folders and display them and store in state
//on click will go to the nested route
//where we will display all the snippets for that folder in state

//4/8 : basically need to style the folders and buttons. need to create state based on the selection of the dropdown
//createfolder -> new input to type folder name and submit
//move snippet -> put to update the db and return all the values of the updated folder
// update the get snippets function to only get snippet of current folder , (where id = req.query.id)
// add x's next to folders to delete folder. have popup appear to ask if user is sure (all snippets inside will be deleted permanently)
//probably style the header to look a bit nicer
//and maybe use drawer for the folders
