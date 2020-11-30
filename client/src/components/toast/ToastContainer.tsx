import React from 'react';
import { useSelector } from 'react-redux';
import Toast, { ToastProps } from './Toast';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IMessage, MessageState } from 'common/interfaces';

const ToastContainer = (props: ToastProps) => {
  const message = useSelector((state: MessageState) => state.message);

  return (
    <TransitionGroup className='toast-container'>
      {message.data.map((message: IMessage, index: number) => (
        <CSSTransition
          key={message.id}
          timeout={300}
          classNames='toast-transition'
        >
          <Toast index={index} {...message} {...props} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default ToastContainer;
