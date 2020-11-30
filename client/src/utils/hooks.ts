import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCurrentUser } from 'redux/user/actions';

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const auth = dispatch(getCurrentUser);
    setIsAuthenticated(auth);
  }, [location, dispatch]);

  return isAuthenticated;
};

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
