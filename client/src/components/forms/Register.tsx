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
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      required: true,
    },
    {
      name: 'passwordConfirm',
      type: 'password',
      placeholder: 'Confirm Password',
      required: true,
      match: 'password',
      matchError: 'Passwords do not match',
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
