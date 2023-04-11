import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.target);
    const username = data.get('username');
    const password = data.get('password');
    const email = data.get('email');

    const userBody = JSON.stringify({ username, password, email });

    const post = await fetch('/api/user', {
      method: 'POST',
      body: userBody,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    setLoading(false);
    if (post.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        navigate(-1);
      }, 500);
    } else {
      setFailed(true);
    }
  };

  const handleFocus = (e) => {
    e.target.placeholder = '';
    setFailed(false);
  };

  const handleBlur = (e) => {
    e.target.placeholder = e.target.name;
  };
  return (
    <>
      <div className='flex flex-col bg-gray-800 align-center h-screen'>
        <div className='flex justify-center'>
          <h1 className='text-5xl font-poppins font-bold m-0 mt-16  text-gray-300'>
            Create your account.
          </h1>
        </div>
        <div className='flex flex-col items-center justify-center flex-grow  font-poppins text-lg'>
          <form
            className='flex flex-col items-center justify-evenly  rounded-3xl h-[550px] w-[30%] m-0 bg-gray-900'
            onSubmit={createUser}
          >
            <input
              type='text'
              placeholder='username'
              className='rounded-3xl py-3  w-80 text-center outline-none'
              aria-label='signup-username-input'
              name='username'
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type='password'
              placeholder='password'
              className=' rounded-3xl py-3  w-80 text-center outline-none'
              name='password'
              aria-label='signup-password-input'
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <input
              type='email'
              placeholder='email'
              className=' rounded-3xl py-3  w-80 text-center outline-none'
              name='email'
              aria-label='signup-email-input'
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button
              className='bg-orange-900 text-white text-xl rounded-2xl w-[90%] h-1/6 hover:bg-orange-800'
              aria-label='submit-submit-button'
              type='submit'
            >
              Sign Up
            </button>
            {loading && <p>Please wait...</p>}
            {success && <p>Success!</p>}
            {failed && <p>Username not available</p>}
          </form>
          <Link
            to={'/'}
            className='font-poppins text-3xl text-white inline-block mb-11 mt-4 hover:text-blue-400'
          >
            {' '}
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
