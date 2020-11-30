import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IUser } from 'common/interfaces';
import { registerUser } from 'redux/user/actions';

const Register = () => {
  const dispatch = useDispatch();
  const ref = useRef<any>();

  const [data, setData] = useState<IUser>({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    ref.current?.focus();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(registerUser(data));
  }

  return (
    <form className='form position-center' onSubmit={handleSubmit}>
      <h2 className='h2'>Register</h2>
      <div className='field'>
        <input
          ref={ref}
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
      <button className='button success'>Register</button>
    </form>
  );
};

export default Register;
