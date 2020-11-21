import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { IUser } from 'common/interfaces';
import { register } from 'services/api';
import './style.scss';

const Register = () => {
  const [redirect, setRedirect] = useState<boolean>(false);

  const [data, setData] = useState<IUser>({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  function handleChange(e: any) {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await register(data);
    if (response) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Redirect to='/login' />;
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
      <input
        type='password'
        name='passwordConfirm'
        placeholder='Confirm Password'
        value={data.passwordConfirm}
        onChange={handleChange}
      />
      <input type='submit' value='Submit' />
    </form>
  );
};

export default Register;
