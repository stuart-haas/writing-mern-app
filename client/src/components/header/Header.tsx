import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <div className='nav-group flex justify-between align-center'>
        <nav className='nav'>
          <Link to='/' className='link'>
            <h1 className='h1'>Fable</h1>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
