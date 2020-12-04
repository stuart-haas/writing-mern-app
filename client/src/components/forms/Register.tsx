import React from 'react';
import { useDispatch } from 'react-redux';
import { IUser } from 'common/interfaces';
import { registerUser } from 'redux/user/actions';
import Form, { FormField } from './Form';

const Register = () => {
  const dispatch = useDispatch();

  const fields: FormField[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Email',
      required: true,
      lookup: '/user/search?email=',
      lookupError: 'Email already exists',
    },
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Username',
      required: true,
      lookup: '/user/search?username=',
      lookupError: 'Username already exists',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Password',
      required: true,
    },
    {
      name: 'passwordConfirm',
      type: 'password',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      required: true,
      match: 'password',
      matchError: 'Passwords do not match',
    },
  ];

  return (
    <Form
      title='Register'
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
