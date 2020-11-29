import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IUser } from 'common/interfaces';
import { userLogin } from 'redux/user/actions';
import { useAuth } from 'utils/hooks';

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useAuth();

  const [data, setData] = useState<IUser>({
    username: '',
    password: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(userLogin(data));
  }

  if (isAuthenticated) {
    return <Redirect to='/me/stories' />;
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='field'>
        <input
          className='input center'
          type='text'
          name='username'
          placeholder='Username'
          value={data.username}
          onChange={handleChange}
        />
      </div>
      <div className='field'>
        <input
          className='input center'
          type='password'
          name='password'
          placeholder='Password'
          value={data.password}
          onChange={handleChange}
        />
      </div>
      <button className='button success'>Login</button>
    </form>
  );
};

export default Login;
