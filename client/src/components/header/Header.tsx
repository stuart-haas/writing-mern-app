import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { FaUserAlt, FaMoon, FaSun } from 'react-icons/fa';
import Dropdown from 'components/dropdown/Dropdown';
import { toggleTheme } from 'redux/theme/actions';
import Toggle from 'components/toggle/Toggle';
import { ThemeState } from 'common/interfaces';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: ThemeState) => state.theme);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (theme.theme == 'dark') {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [theme]);

  return (
    <header className='flex justify-between align-center'>
      <Link to='/' className='link'>
        <h1 className='h1'>Fable</h1>
      </Link>
      <nav className='nav'>
        <span className='nav-link'>
          <Toggle
            enabled={enabled}
            offLabel={<FaMoon />}
            onLabel={<FaSun />}
            toggle={() => dispatch(toggleTheme)}
          />
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
