import { IMessage } from 'common/interfaces';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeMessage } from 'redux/message/actions';

export interface ToastProps {
  autoDismiss?: boolean;
  autoDismissDelay?: number;
}
interface ToastPropsExtras extends ToastProps {
  index: number;
}

const Toast = (props: IMessage & ToastProps & ToastPropsExtras) => {
  const nodeRef = useRef<any>();
  const dispatch = useDispatch();
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    const style =
      nodeRef.current?.currentStyle || window.getComputedStyle(nodeRef.current);
    const pos =
      (nodeRef.current.clientHeight +
        parseInt(style.marginBottom.split('px')[0])) *
      props.index;
    setPosition(pos);
  }, [props.index]);

  useEffect(() => {
    if (props.autoDismiss) {
      const interval = setInterval(() => {
        dispatch(removeMessage(props.id));
      }, props.autoDismissDelay);
      return () => {
        clearInterval(interval);
      };
    }
  }, [props.id]);

  return (
    <div
      ref={nodeRef}
      className={`toast ${props.status}`}
      style={{ bottom: `${position}px` }}
    >
      <div className='toast-content'>
        <div className='toast-message'>{props.message}</div>
        {!props.autoDismiss && (
          <span
            className='toast-close'
            onClick={() => dispatch(removeMessage(props.id))}
          ></span>
        )}
      </div>
    </div>
  );
};

Toast.displayName = 'Toast';

export default Toast;
