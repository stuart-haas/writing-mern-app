import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className='header flex justify-end'>
      <nav className='nav'>
        <Link className='nav__item' to='/stories'>
          Stories
        </Link>
        <Link className='nav__item' to='/profile'>
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default Header;
