import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from 'redux/user/actions';
import { useAuth } from 'utils/hooks';
import { createStory } from 'redux/story/actions';
import { ThemeState } from 'common/interfaces';
import Toggle from 'components/toggle/Toggle';
import { FaMoon, FaSun } from 'react-icons/fa';
import { toggleTheme } from 'redux/theme/actions';

const Menu = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useAuth();
  const theme = useSelector((state: ThemeState) => state.theme);
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (theme.theme === 'dark') {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [theme]);

  return (
    <div className='menu'>
      <span className='menu-item'>
        <Toggle
          enabled={enabled}
          offLabel={<FaMoon />}
          onLabel={<FaSun />}
          toggle={() => dispatch(toggleTheme)}
        />
      </span>
      <hr className='menu-divider' />
      {isAuthenticated && (
        <Fragment>
          <span className='menu-item'>
            <span className='link' onClick={() => dispatch(createStory)}>
              New Story
            </span>
          </span>
          <span className='menu-item'>
            <NavLink
              className='link'
              activeClassName='is-active'
              exact={true}
              to='/me/stories'
            >
              My Stories
            </NavLink>
          </span>
          <span className='menu-item'>
            <NavLink
              className='link'
              activeClassName='is-active'
              to='/me/settings'
            >
              Settings
            </NavLink>
          </span>
          <hr className='menu-divider' />
          <span className='menu-item'>
            <NavLink
              className='link'
              activeClassName='is-active'
              to='/me/bookmarks'
            >
              Bookmarks
            </NavLink>
          </span>
          <hr className='menu-divider' />
          <span className='menu-item'>
            <button className='button' onClick={() => dispatch(logoutUser())}>
              Logout
            </button>
          </span>
        </Fragment>
      )}
      {!isAuthenticated && (
        <Fragment>
          <span className='menu-item'>
            <NavLink className='link' activeClassName='is-active' to='/login'>
              Login
            </NavLink>
          </span>
          <span className='menu-item'>
            <NavLink
              className='link'
              activeClassName='is-active'
              to='/register'
            >
              Register
            </NavLink>
          </span>
        </Fragment>
      )}
    </div>
  );
};

export default Menu;
