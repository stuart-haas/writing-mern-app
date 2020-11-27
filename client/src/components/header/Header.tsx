import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authLogout } from 'redux/auth/actions';
import { useAuth } from 'utils/hooks';
import classnames from 'classnames';
import styles from './header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useAuth();

  return (
    <header className={classnames(styles.root, 'flex justify-end')}>
      <nav className={styles.nav}>
        <Link className={classnames(styles.navLink, 'link')} to='/stories'>
          Stories
        </Link>
        <Link className={classnames(styles.navLink, 'link')} to='/profile'>
          Profile
        </Link>
        {isAuthenticated && (
          <span className={classnames(styles.navLink, 'link')}>
            <button className='button' onClick={() => dispatch(authLogout)}>
              Logout
            </button>
          </span>
        )}
      </nav>
    </header>
  );
};

export default Header;
