import { IMessage } from 'common/interfaces';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { removeMessage } from 'redux/message/actions';

export interface ToastProps {
  autoDismiss?: boolean;
}

const Toast = (props: IMessage & ToastProps) => {
  const ref = useRef<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.autoDismiss) {
      const interval = setInterval(() => {
        dispatch(removeMessage(props.id));
      }, 3000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [props.id]);

  function handleClose() {
    dispatch(removeMessage(props.id));
  }

  return (
    <div ref={ref} className={`toast ${props.status}`}>
      <span className='toast-message'>{props.message}</span>
      {!props.autoDismiss && (
        <span className='toast-close' onClick={() => handleClose()}></span>
      )}
    </div>
  );
};

export default Toast;
