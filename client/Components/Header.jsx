import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsername } from '../Providers/UserProvider.jsx';

const Header = ({ children }) => {
  const { setAuthenticated } = useUsername();
  const navigate = useNavigate();
  const logout = useCallback(async () => {
    try {
      const killSession = await fetch('/api/user/logout');
      if (!killSession.ok) throw { message: 'Logout failed' };
      localStorage.setItem('username', '');
      setAuthenticated(false);
      navigate('../login');
    } catch (e) {
      console.log(e.message);
    }
  }, [setAuthenticated]);
  return (
    <>
      <div className='flex justify-between bg-yellow-800 h-24 items-center'>
        <a className='inline-block ml-10' href='#'>
          Snippets Collection
        </a>{' '}
        <span className='welcome'>Welcome Back</span>{' '}
        <button className='inline-block mr-10' onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Header;
