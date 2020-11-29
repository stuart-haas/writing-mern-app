import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { userLogout } from 'redux/user/actions';
import { useAuth } from 'utils/hooks';
import { FaUserAlt } from 'react-icons/fa';
import api from 'services/api';

const Header = () => {
  const isAuthenticated = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className='flex justify-end'>
      <nav className='nav'>
        <NavLink className='nav-link' activeClassName='is-active' to='/stories'>
          Stories
        </NavLink>
        {isAuthenticated && (
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
        )}
        {!isAuthenticated && (
          <NavLink className='nav-link' activeClassName='is-active' to='/login'>
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};

const Dropdown = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleNewStory() {
    const response = await api.post('/story/user/new');
    if (response) {
      const { data } = response;
      history.push(`/me/story/edit/${data._id}`);
    }
  }

  return (
    <div className={`dropdown ${props.isOpen ? 'is-active' : ''}`}>
      <span className='dropdown-item'>
        <span className='link' onClick={() => handleNewStory()}>
          New Story
        </span>
      </span>
      <span className='dropdown-item'>
        <Link className='link' to='/me/stories'>
          My Stories
        </Link>
      </span>
      <hr className='dropdown-divider' />
      <span className='dropdown-item'>
        <button className='button' onClick={() => dispatch(userLogout)}>
          Logout
        </button>
      </span>
    </div>
  );
};

export default Header;
