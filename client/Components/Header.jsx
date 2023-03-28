import React from 'react';
import { Outlet } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className='header'>
        <a href='#'>Snippets Collection</a>{' '}
        <span className='welcome'>Welcome Back</span> <a href='#'>Logout</a>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
