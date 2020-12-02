import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IUser } from 'common/interfaces';
import { getCurrentUser, updateUser } from 'redux/user/actions';
import Form, { FormField, FormData, mapData } from 'components/forms/Form';

const Settings = () => {
  const fields: FormField[] = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      required: true,
    },
    {
      name: 'currentPassword',
      type: 'password',
      placeholder: 'Current Password',
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
    },
  ];

  const dispatch = useDispatch();
  const [data, setData] = useState<FormData>(mapData(fields));

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await dispatch(getCurrentUser);
      const { data } = response;
      setData(data);
    };
    fetchData();
  }, [dispatch]);

  return (
    <Form
      title='Settings'
      class='position-center'
      autoFocus
      button={{
        label: 'Update',
      }}
      fields={fields}
      data={data}
      submit={(data: IUser) => dispatch(updateUser(data))}
    />
  );
};

export default Settings;
