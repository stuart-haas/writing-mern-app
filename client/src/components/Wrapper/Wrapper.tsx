import React from 'react';
import Header from 'components/Header/Header';
import Main from 'components/Main/Main';

const Wrapper = (props: any) => {
  return (
    <div className='wrapper'>
      <Header />
      <Main>{props.children}</Main>
    </div>
  );
};

export default Wrapper;
