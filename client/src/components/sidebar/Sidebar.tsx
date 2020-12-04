import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  children: JSX.Element | JSX.Element[];
}

const Sidebar = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  return (
    <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
      <div className='sidebar-open' onClick={() => setIsOpen(true)}></div>
      <div className='sidebar-content'>
        <div className='sidebar-close' onClick={() => setIsOpen(false)}></div>
        {props.children}
      </div>
    </aside>
  );
};

export default Sidebar;
