import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsername } from '../Providers/UserProvider.jsx';
import scissorsImage from '../Images/scissors.png';

const Header = ({ children }) => {
  const { setAuthenticated, username } = useUsername();
  const { currentFolder } = useParams();
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
  }, []);
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='fixed top-0 w-full z-50 flex justify-between bg-orange-900 h-20 items-center font-sans text-black text-2xl'>
        <span className='pl-10'>
          Currently viewing:{' '}
          {currentFolder === 'default' ? 'Home' : currentFolder}
        </span>{' '}
        <div className='flex justify-around items-center'>
          <img src={scissorsImage} alt='scissors-icon' className='h-16 w-16' />
          <span className='username ml-7'>{username} </span>
        </div>
        <button
          className='inline-block pr-10 hover:text-gray-800'
          onClick={logout}
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
};

export default Header;
