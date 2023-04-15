import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsername } from '../Providers/UserProvider.jsx';
import scissorsImage from '../Images/scissors.png';

const Header = ({ children }) => {
  const { setAuthenticated, username } = useUsername();
  const { currentFolder } = useParams();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const killSession = await fetch('/api/user/logout');
      if (!killSession.ok) throw { message: 'Logout failed' };
      localStorage.setItem('username', '');
      setAuthenticated(false);
      navigate('../login');
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className='flex flex-col min-h-screen relative'>
      <div className='fixed top-0 w-full z-50 flex justify-between bg-yellow-600 h-20 items-center font-sans text-teal-950 text-2xl'>
        <span className='pl-10'>
          <strong>Currently viewing: </strong>
          <i className='text-black'>
            {currentFolder === 'home' ? 'Home' : currentFolder}
          </i>
        </span>{' '}
        <div className='absolute left-[50%]'>
          <div className='flex justify-around items-center'>
            <img
              src={scissorsImage}
              alt='scissors-icon'
              className='h-16 w-16'
            />
            <strong className='username ml-7'>{username} </strong>
          </div>
        </div>
        <button
          className='inline-block text-gray-800 pr-10 hover:underline hover:text-gray-900'
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
