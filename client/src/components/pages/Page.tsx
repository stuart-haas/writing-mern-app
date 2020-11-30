import React from 'react';

const Page = (props: any) => {
  return (
    <div className='page'>
      <div className='page-header'>
        <h2 className='h2'>{props.title}</h2>
      </div>
      {props.children}
    </div>
  );
};

export default Page;
