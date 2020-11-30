import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, UserState } from 'common/interfaces';
import { updateUser } from 'redux/user/actions';
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
  const user = useSelector((state: UserState) => state.user);
  const [data, setData] = useState<FormData>(mapData(fields));

  useEffect(() => {
    const { username } = user.user;
    setData((prevState: any) => ({ ...prevState, username }));
  }, [user]);

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
