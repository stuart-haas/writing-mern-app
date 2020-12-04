import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('state')!).user
      .authenticated;
    setIsAuthenticated(session);
  }, [location, dispatch]);

  return isAuthenticated;
};

// TODO: Fix ref, handler, and event types
export const useOnClickOutside = (ref: any, handler: any) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
