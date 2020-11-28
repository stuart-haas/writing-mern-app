import React from 'react';
import { useSelector } from 'react-redux';
import Toast, { ToastProps } from './Toast';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IMessage } from 'common/interfaces';

const ToastGroup = (props: ToastProps) => {
  const message = useSelector((state: any) => state.message);
  const data = [...message.data].reverse();

  return (
    <TransitionGroup className='toast-container'>
      {data.map((message: IMessage) => (
        <CSSTransition
          key={message.id}
          timeout={300}
          classNames='toast-transition'
        >
          <Toast {...message} {...props} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default ToastGroup;
