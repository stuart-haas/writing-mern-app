import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userLogout } from 'redux/user/actions';
import { useAuth } from 'utils/hooks';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useAuth();

  return (
    <header className='flex justify-end'>
      <nav className='nav'>
        <NavLink className='nav-link' activeClassName='is-active' to='/stories'>
          Stories
        </NavLink>
        {isAuthenticated && (
          <NavLink
            className='nav-link'
            activeClassName='is-active'
            to='/me/stories'
          >
            My Stories
          </NavLink>
        )}
        {!isAuthenticated && (
          <NavLink className='nav-link' activeClassName='is-active' to='/login'>
            Login
          </NavLink>
        )}
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
