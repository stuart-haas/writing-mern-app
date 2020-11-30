import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, UserState } from 'common/interfaces';
import { loginUser } from 'redux/user/actions';
import { useHistory } from 'react-router-dom';
import Form, { FormField } from './Form';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: UserState) => state.user);
  const history = useHistory();

  const fields: FormField[] = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      required: true,
    },
  ];

  useEffect(() => {
    if (user && user.authenticated) {
      history.push('/me/stories');
    }
  }, [user, history]);

  return (
    <Form
      title='Login'
      class='position-center'
      autoFocus
      button={{
        label: 'Login',
      }}
      fields={fields}
      submit={(data: IUser) => dispatch(loginUser(data))}
    />
  );
};

export default Login;
