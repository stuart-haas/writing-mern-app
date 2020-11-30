import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, UserState } from 'common/interfaces';
import { updateUser } from 'redux/user/actions';
import Form, { FormField, FormData, mapData } from 'components/forms/Form';

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: UserState) => state.user);
  const [data, setData] = useState<FormData>({});

  const fields: FormField[] = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Username',
    },
    {
      fieldGroup: {
        label: 'Change Your Password',
        fields: [
          {
            name: 'currentPassword',
            type: 'password',
            placeholder: 'Current Password',
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
        ],
      },
    },
  ];

  useEffect(() => {
    setData(mapData(fields));
  }, []);

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
