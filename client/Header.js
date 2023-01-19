import React from 'react';

const Header = () => {
  return (
    <div className='headContainer'>
      <div className='header'>
        <a href='#'>Snippets Collection</a>{' '}
        <span className='welcome'>Welcome Back</span> <a href='#'>Logout</a>
      </div>
    </div>
  );
};

export default Header;
