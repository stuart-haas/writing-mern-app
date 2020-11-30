import React, { useState } from 'react';

interface Props {
  enabled: boolean;
  onLabel: string | any;
  offLabel: string | any;
  toggle: () => void;
}

const Toggle = (props: Props) => {
  const [enabled, setEnabled] = useState<boolean>(props.enabled || false);

  return (
    <div
      className={`toggle ${enabled ? 'is-enabled' : ''}`}
      onClick={() => {
        setEnabled(!enabled);
        props.toggle();
      }}
    >
      <div className='toggle-container'>
        <div className='toggle-label'>{props.offLabel}</div>
        <div className='toggle-background'>
          <div className='toggle-button'></div>
        </div>
        <div className='toggle-label'>{props.onLabel}</div>
      </div>
    </div>
  );
};

export default Toggle;
