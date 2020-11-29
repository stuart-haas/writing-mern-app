import React, { Fragment } from 'react';
import Header from 'components/header/Header';
import Main from 'components/main/Main';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Container = (props: Props) => {
  return (
    <Fragment>
      <Header />
      <Main>{props.children}</Main>
    </Fragment>
  );
};

export default Container;
