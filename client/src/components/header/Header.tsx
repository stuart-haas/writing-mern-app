import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import Dropdown from 'components/dropdown/Dropdown';
import { toggleTheme } from 'redux/theme/actions';

const Header = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className='flex justify-between align-center'>
      <Link to='/' className='link'>
        <h1 className='h1'>Fable</h1>
      </Link>
      <nav className='nav'>
        <span className='nav-link'>
          <button
            className='button success'
            onClick={() => dispatch(toggleTheme)}
          >
            Toggle Theme
          </button>
        </span>
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
          <Dropdown
            isOpen={isOpen}
            toggle={(open: boolean) => setIsOpen(open)}
          />
        </span>
      </nav>
    </header>
  );
};

export default Header;
