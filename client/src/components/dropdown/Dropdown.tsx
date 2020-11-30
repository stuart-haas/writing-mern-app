import React, { Fragment, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from 'redux/user/actions';
import { useAuth, useOnClickOutside } from 'utils/hooks';
import { newStory } from 'redux/story/actions';

const Dropdown = (props: any) => {
  const ref = useRef<any>();
  const dispatch = useDispatch();
  const isAuthenticated = useAuth();
  useOnClickOutside(ref, () => props.close());

  return (
    <div ref={ref} className={`dropdown ${props.isOpen ? 'is-active' : ''}`}>
      {isAuthenticated && (
        <Fragment>
          <span className='dropdown-item'>
            <span className='link' onClick={() => dispatch(newStory)}>
              New Story
            </span>
          </span>
          <span className='dropdown-item'>
            <NavLink
              className='link'
              activeClassName='is-active'
              to='/me/stories'
            >
              Stories
            </NavLink>
          </span>
          <hr className='dropdown-divider' />
          <span className='dropdown-item'>
            <NavLink
              className='link'
              activeClassName='is-active'
              to='/me/settings'
            >
              Settings
            </NavLink>
          </span>
          <hr className='dropdown-divider' />
          <span className='dropdown-item'>
            <button className='button' onClick={() => dispatch(logoutUser)}>
              Logout
            </button>
          </span>
        </Fragment>
      )}
      {!isAuthenticated && (
        <Fragment>
          <span className='dropdown-item'>
            <NavLink className='link' activeClassName='is-active' to='/login'>
              Login
            </NavLink>
          </span>
          <span className='dropdown-item'>
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

export default Dropdown;
