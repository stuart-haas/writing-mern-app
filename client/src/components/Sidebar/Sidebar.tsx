import React from 'react';
import './Sidebar.scss';

const Sidebar = (props: any) => {
  return (
    <div className='sidebar'>
      <nav className='nav'>
        <a className='nav-item active'>Stories</a>
        <a className='nav-item'>Settings</a>
      </nav>
    </div>
  );
};

export default Sidebar;
