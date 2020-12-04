import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  children: JSX.Element | JSX.Element[];
}

const Sidebar = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

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
