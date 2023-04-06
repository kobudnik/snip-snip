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
  return (
    <>
      <div id='create-body' className='standard-body create-body'>
        <div className='standard-title font-thin'>
          <h1>Welcome! Please create your account.</h1>
        </div>

        <form
          id='user-create-form'
          className='standard-form create-form'
          role='form'
          onSubmit={createUser}
        >
          <input
            className='standard-input create-input'
            aria-label='new-username-input'
            placeholder='username'
            type='text'
            name='username'
            onChange={(e) => setFailed(false)}
          />
          <input
            className='standard-input create-input'
            aria-label='new-password-input'
            placeholder='password'
            type='password'
            name='password'
          />
          <input
            className='standard-input create-input'
            aria-label='new-email-input'
            placeholder='email'
            type='text'
            name='email'
          />
          <button type='submit' className='standard-button create-button'>
            {' '}
            Submit
          </button>
          {loading && <p>Please wait...</p>}
          {success && <p>Success!</p>}
          {failed && <p>Username not available</p>}
        </form>
        <Link to={'/'} className='standard-button white-button'>
          {' '}
          Go Back
        </Link>
      </div>
    </>
  );
};

export default Signup;
