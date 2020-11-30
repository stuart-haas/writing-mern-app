import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, UserState } from 'common/interfaces';
import { loginUser } from 'redux/user/actions';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: UserState) => state.user);
  const ref = useRef<any>();
  const history = useHistory();

  const [data, setData] = useState<IUser>({
    username: '',
    password: '',
  });

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    if (user && user.authenticated) {
      history.push('/me/stories');
    }
  }, [user, history]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(loginUser(data));
  }

  return (
    <form className='form position-center' onSubmit={handleSubmit}>
      <h2 className='h2'>Login</h2>
      <div className='field'>
        <input
          ref={ref}
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
