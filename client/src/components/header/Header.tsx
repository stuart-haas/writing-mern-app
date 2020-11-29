import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogout } from 'redux/user/actions';
import { useAuth } from 'utils/hooks';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useAuth();

  return (
    <header className='flex justify-end'>
      <nav className='nav'>
        <Link className='nav-link' to='/stories'>
          Stories
        </Link>
        <Link className='nav-link' to='/profile'>
          Profile
        </Link>
        {isAuthenticated && (
          <span className='nav-link'>
            <button
              className='button link'
              onClick={() => dispatch(userLogout)}
            >
              Logout
            </button>
          </span>
        )}
      </nav>
    </header>
  );
};

export default Header;
