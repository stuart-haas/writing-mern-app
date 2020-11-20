import { IUser } from 'common/interfaces';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from 'services/api';
import './style.scss';

const Login = () => {
  const history = useHistory();

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

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await login(data);
    if (response.status === 200) {
      history.push('/stories');
    }
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
