import React from 'react';

interface Props {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

const Page = (props: Props) => {
  return (
    <div className='page'>
      <div className='page-header'>
        <h2 className='h2'>{props.title}</h2>
      </div>
      <div className='page-content'>{props.children}</div>
    </div>
  );
};

export default Page;
