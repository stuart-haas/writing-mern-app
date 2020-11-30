import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logoutUser } from 'redux/user/actions';
import { useAuth } from 'utils/hooks';
import { FaUserAlt } from 'react-icons/fa';
import { newStory } from 'redux/story/actions';

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className='flex justify-between align-center'>
      <Link to='/' className='link'>
        <h1 className='h1'>Fable</h1>
      </Link>
      <nav className='nav'>
        <NavLink className='nav-link' activeClassName='is-active' to='/stories'>
          Stories
        </NavLink>
        <span
          className='nav-link dropdown-trigger'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className='button round outline'>
            <i className='icon'>
              <FaUserAlt />
            </i>
          </span>
          <Dropdown isOpen={isOpen} />
        </span>
      </nav>
    </header>
  );
};

const Dropdown = (props: any) => {
  const dispatch = useDispatch();
  const isAuthenticated = useAuth();

  return (
    <div className={`dropdown ${props.isOpen ? 'is-active' : ''}`}>
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

export default Header;
