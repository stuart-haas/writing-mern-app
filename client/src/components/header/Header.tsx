import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { authLogout } from 'redux/reducers/auth';
import classnames from 'classnames';
import styles from './header.module.scss';

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
    <header className={classnames(styles.root, 'flex justify-end')}>
      <nav className={styles.nav}>
        <Link className={classnames(styles.navLink, 'link')} to='/stories'>
          Stories
        </Link>
        <Link className={classnames(styles.navLink, 'link')} to='/profile'>
          Profile
        </Link>
        {auth.authenticated && (
          <span className={classnames(styles.navLink, 'link')}>
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
