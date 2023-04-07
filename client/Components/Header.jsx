import React from 'react';
import { Outlet } from 'react-router-dom';

const Header = ({ children }) => {
  return (
    <>
      <div className='header'>
        <a href='#'>Snippets Collection</a>{' '}
        <span className='welcome'>Welcome Back</span> <a href='#'>Logout</a>
      </div>
    </>
  );
};

export default Header;
