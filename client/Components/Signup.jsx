import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const navigate = useNavigate();
  const createUser = async (e) => {
    e.preventDefault();
    const hasNumber = /\d+/;
    const hasSpecialChar = /[^A-Za-z0-9]+/;
    if (!hasNumber.test(newPassword)) {
      setStatus('Password must include a number');
    } else if (!hasSpecialChar.test(newPassword)) {
      setStatus('Password must contain a special character.');
    } else {
      try {
        setLoading(true);

        const userBody = JSON.stringify({
          username: newUsername,
          password: newPassword,
          email: newEmail,
        });
        const postNewUser = await fetch('/api/user', {
          method: 'POST',
          body: userBody,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        setLoading(false);
        if (!postNewUser.ok) {
          throw new Error('Username not available');
        }
        setStatus('Success!');
        setTimeout(() => {
          navigate(-1);
        }, 500);
      } catch (e) {
        setStatus(e.message);
      }
    }
  };

  const handleFocus = (e) => {
    e.target.placeholder = '';
    setStatus('');
  };

  const handleBlur = (e) => {
    e.target.placeholder = e.target.name;
  };
  const handleNewUsername = (e) => {
    setNewUsername(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleNewEmail = (e) => {
    setNewEmail(e.target.value);
  };

  return (
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
            onChange={handleNewUsername}
          />
          <input
            type='password'
            placeholder='password'
            className=' rounded-3xl py-3  w-80 text-center outline-none'
            name='password'
            aria-label='signup-password-input'
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleNewPassword}
          />

          <input
            type='email'
            placeholder='email'
            className=' rounded-3xl py-3  w-80 text-center outline-none'
            name='email'
            aria-label='signup-email-input'
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleNewEmail}
          />
          <button
            className='bg-orange-900 text-white text-xl rounded-2xl w-[90%] h-1/6 hover:bg-orange-800'
            aria-label='submit-submit-button'
            type='submit'
          >
            Sign Up
          </button>
          {loading && <p>Please wait...</p>}
          {status && (
            <p
              className={`${
                status === 'Success!' ? 'text-green-800' : 'text-red-600'
              }`}
            >
              {status}
            </p>
          )}
        </form>
        <Link
          to='/'
          className='font-poppins text-3xl text-white inline-block mb-11 mt-4 hover:text-blue-400'
        >
          {' '}
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default Signup;
