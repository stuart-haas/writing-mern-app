import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useAuth = () => {
  const auth = useSelector((state: any) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [auth]);

  return isAuthenticated;
};
