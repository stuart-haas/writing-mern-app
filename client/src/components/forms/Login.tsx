import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IUser } from 'common/interfaces';
import { authLogin } from 'redux/auth/actions';

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

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
    dispatch(authLogin(data));
  }

  if (auth.authenticated) {
    return <Redirect to='/stories' />;
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
      <button className='button'>Login</button>
    </form>
  );
};

export default Login;
