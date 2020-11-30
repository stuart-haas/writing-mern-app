import React from 'react';

interface Props {
  enabled: boolean;
  onLabel: string | any;
  offLabel: string | any;
  toggle: () => void;
}

const Toggle = (props: Props) => {
  return (
    <div
      className={`toggle ${props.enabled ? 'is-enabled' : ''}`}
      onClick={() => {
        props.toggle();
      }}
    >
      <div className='toggle-container'>
        <div className='toggle-label'>{props.onLabel}</div>
        <div className='toggle-background'>
          <div className='toggle-button'></div>
        </div>
        <div className='toggle-label'>{props.offLabel}</div>
      </div>
    </div>
  );
};

export default Toggle;
