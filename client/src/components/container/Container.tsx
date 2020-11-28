import React from 'react';
import Header from 'components/header/Header';
import Main from 'components/main/Main';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Container = (props: Props) => {
  return (
    <div className='container'>
      <Header />
      <Main>{props.children}</Main>
    </div>
  );
};

export default Container;
