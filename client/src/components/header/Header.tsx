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
        <Link className='link' to='/stories'>
          Stories
        </Link>
        <Link className='link' to='/profile'>
          Profile
        </Link>
        {auth.authenticated && (
          <span className='link'>
            <button className='button' onClick={handleLogout}>
              Logout
            </button>
          </span>
        )}
      </nav>
    </header>
  );
};

export default Header;
