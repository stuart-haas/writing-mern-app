import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { authLogout } from 'redux/reducers/auth';
import './style.scss';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const [redirect, setRedirect] = useState<boolean>(false);

  function handleLogout() {
    dispatch(authLogout);
    setRedirect(true);
  }

  if (redirect) {
    setRedirect(false);
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
