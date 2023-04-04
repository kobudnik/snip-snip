import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';

const Header = () => {
  return (
    <AuthenticatedRoute>
      <div className='header'>
        <a href='#'>Snippets Collection</a>{' '}
        <span className='welcome'>Welcome Back</span> <a href='#'>Logout</a>
      </div>
      <Outlet />
    </AuthenticatedRoute>
  );
};

export default Header;
