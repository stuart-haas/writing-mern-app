import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from 'redux/reducers/auth';
import './style.scss';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const history = useHistory();

  useEffect(() => {
    const { authenticated } = auth;
    if (!authenticated) {
      history.push('/login');
    }
  }, [auth, history]);

  function handleLogout() {
    dispatch(logoutUser);
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
