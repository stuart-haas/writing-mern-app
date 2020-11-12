import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <nav className='nav'>
        <Link className='nav-item' to='/stories'>
          Stories
        </Link>
        <Link className='nav-item' to='/profile'>
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default Header;
