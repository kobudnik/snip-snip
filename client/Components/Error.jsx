import React from 'react';
import { Link } from 'react-router-dom';
import scissorsImage from '../Images/scissors.png';

function Error() {
  return (
    <div className='error-page flex flex-col items-center justify-center h-screen w-screen text-3xl text-yellow-600'>
      <img
        src={scissorsImage}
        className='w-20 h-20 inline-block mb-5'
        alt='scissor-icon'
      />
      <h1 className='mb-5'>No snippets to be found!</h1>
      <p className='mb-5'>Make sure this folder actually exists...</p>
      <Link
        to='/'
        className='font-poppins text-3xl text-blue-600 inline-block mb-11 mt-4 hover:text-blue-500'
      >
        {' '}
        Go Home
      </Link>
    </div>
  );
}

export default Error;
