import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IUser } from 'common/interfaces';
import { updateUser } from 'redux/user/actions';

const UserSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [redirect, setRedirect] = useState<boolean>(false);
  const ref = useRef<any>();

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
    await dispatch(updateUser(data));
    setRedirect(true);
  }

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    const { username } = JSON.parse(user.user);
    setData((prevState: any) => ({ ...prevState, username }));
  }, [user]);

  if (redirect) {
    return <Redirect to='/me/stories' />;
  }

  return (
    <form className='form center' onSubmit={handleSubmit}>
      <h2 className='h2'>Settings</h2>
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

export default UserSettings;
