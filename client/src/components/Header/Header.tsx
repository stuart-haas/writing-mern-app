import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout } from 'services/api';
import './style.scss';

const Header = () => {
  const history = useHistory();

  async function handleLogout() {
    const response = await logout();
    if (response.status === 200) {
      history.push('/login');
    }
  }

  return (
    <header className='header flex justify-end'>
      <nav className='nav'>
        <Link className='nav__item' to='/stories'>
          Stories
        </Link>
        <Link className='nav__item' to='/profile'>
          Profile
        </Link>
        <a className='nav__item' onClick={handleLogout}>
          Logout
        </a>
      </nav>
    </header>
  );
};

export default Header;
