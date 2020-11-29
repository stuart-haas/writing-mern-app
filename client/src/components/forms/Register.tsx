import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IUser } from 'common/interfaces';
import { userRegister } from 'redux/user/actions';

const Register = () => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState<boolean>(false);

  const [data, setData] = useState<IUser>({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await dispatch(userRegister(data));
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) {
    return <Redirect to='/login' />;
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='field'>
        <input
          className='input'
          type='text'
          name='username'
          placeholder='Username'
          value={data.username}
          onChange={handleChange}
        />
      </div>
      <div className='field'>
        <input
          className='input'
          type='password'
          name='password'
          placeholder='Password'
          value={data.password}
          onChange={handleChange}
        />
      </div>
      <div className='field'>
        <input
          className='input'
          type='password'
          name='passwordConfirm'
          placeholder='Confirm Password'
          value={data.passwordConfirm}
          onChange={handleChange}
        />
      </div>
      <button className='button'>Register</button>
    </form>
  );
};

export default Register;
