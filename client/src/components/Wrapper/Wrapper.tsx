import React from 'react';
import Header from 'components/Header/Header';
import Main from 'components/Main/Main';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = (props: Props) => {
  return (
    <div className='wrapper'>
      <Header />
      <Main>{props.children}</Main>
    </div>
  );
};

export default Wrapper;
