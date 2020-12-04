import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useOnClickOutside } from 'utils/hooks';

interface Props {
  isOpen: boolean;
  children: JSX.Element | JSX.Element[];
}

const Sidebar = (props: Props) => {
  const location = useLocation();
  const ref = useRef<any>();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  useOnClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <aside ref={ref} className={`sidebar ${isOpen ? 'is-open' : ''}`}>
      <div className='sidebar-open' onClick={() => setIsOpen(true)}></div>
      <div className='sidebar-content'>
        <div className='sidebar-close' onClick={() => setIsOpen(false)}></div>
        {props.children}
      </div>
    </aside>
  );
};

export default Sidebar;
