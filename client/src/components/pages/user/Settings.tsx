import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, UserState } from 'common/interfaces';
import { updateUser } from 'redux/user/actions';

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: UserState) => state.user);
  const [errors, setErrors] = useState<any>([]);
  const ref = useRef<any>();

  const [data, setData] = useState<IUser>({
    username: '',
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    const { username } = user.user;
    setData((prevState: any) => ({ ...prevState, username }));
  }, [user]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { errors } = await dispatch<any>(updateUser(data));
    if (errors) {
      setErrors(errors);
    }
    setData({
      ...data,
      currentPassword: '',
      password: '',
      passwordConfirm: '',
    });
  }

  return (
    <form className='form position-center' onSubmit={handleSubmit}>
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
      <div className='field-group'>
        <span className='field-group-heading'>Change your Password</span>
        <div className='field'>
          <input
            className='input'
            type='password'
            name='currentPassword'
            placeholder='Current Password'
            value={data.currentPassword}
            onChange={handleChange}
          />
          <label className='field-error'>
            {errors.length > 0 &&
              errors.filter((e: any) => e.param === 'currentPassword')[0][
                'msg'
              ]}
          </label>
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
      </div>
      <button className='button success'>Update</button>
    </form>
  );
};

export default Settings;
