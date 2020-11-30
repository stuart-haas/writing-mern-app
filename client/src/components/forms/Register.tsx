import React from 'react';
import { useDispatch } from 'react-redux';
import { IUser } from 'common/interfaces';
import { registerUser } from 'redux/user/actions';
import Form, { FormField } from './Form';

const Register = () => {
  const dispatch = useDispatch();

  const fields: FormField[] = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Username',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
    },
    {
      name: 'passwordConfirm',
      type: 'password',
      placeholder: 'Confirm Password',
    },
  ];

  return (
    <Form
      title='Register'
      class='position-center'
      autoFocus
      button={{
        label: 'Register',
      }}
      fields={fields}
      submit={(data: IUser) => dispatch(registerUser(data))}
    />
  );
};

export default Register;
