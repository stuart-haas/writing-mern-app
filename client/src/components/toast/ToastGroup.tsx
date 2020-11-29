import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Toast, { ToastProps } from './Toast';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IMessage } from 'common/interfaces';

const ToastGroup = (props: ToastProps) => {
  const message = useSelector((state: any) => state.message);
  const nodeRef = useRef();

  return (
    <TransitionGroup className='toast-container'>
      {message.data.map((message: IMessage, index: number) => (
        <CSSTransition
          nodeRef={nodeRef}
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

export default ToastGroup;
