import React from 'react';
import { useSelector } from 'react-redux';
import Toast from './Toast';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ToastContainer = () => {
  const message = useSelector((state: any) => state.message);
  const data = [...message.data].reverse();

  return (
    <div className='toast-container'>
      <TransitionGroup className='toast-list'>
        {data.map((message: any, index: number) => (
          <CSSTransition
            key={index}
            timeout={500}
            classNames='toast-transition'
          >
            <Toast id={index} {...message} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default ToastContainer;
