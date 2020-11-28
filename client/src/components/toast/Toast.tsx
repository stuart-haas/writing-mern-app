import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeMessage } from 'redux/message/actions';

const Toast = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const duration = 3000;
    const id = setTimeout(() => dispatch(removeMessage(props.id)), duration);

    return () => clearTimeout(id);
  }, [props.id]);

  return (
    <div className={`toast ${props.status}`}>
      <span className='toast-message'>{props.message}</span>
    </div>
  );
};

export default Toast;
