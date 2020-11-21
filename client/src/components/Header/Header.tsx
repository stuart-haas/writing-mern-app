import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { authLogout } from 'redux/reducers/auth';
import './style.scss';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  function handleLogout() {
    dispatch(authLogout);
  }

  if (!auth.authenticated) {
    return <Redirect to='/login' />;
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
        {auth.authenticated && (
          <button className='btn nav__item' onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
