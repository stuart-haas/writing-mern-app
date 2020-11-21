import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IUser } from 'common/interfaces';
import { authLogin } from 'redux/reducers/auth';
import './style.scss';

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const [data, setData] = useState<IUser>({
    username: '',
    password: '',
  });

  function handleChange(e: any) {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    dispatch(authLogin(data));
  }

  if (auth.authenticated) {
    return <Redirect to='/stories' />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='username'
        placeholder='Username'
        value={data.username}
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={data.password}
        onChange={handleChange}
      />
      <input type='submit' value='Submit' />
    </form>
  );
};

export default Login;
