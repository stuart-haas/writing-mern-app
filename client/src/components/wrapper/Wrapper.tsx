import React from 'react';
import Header from 'components/header/Header';
import Main from 'components/main/Main';
import styles from './wrapper.module.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = (props: Props) => {
  return (
    <div className={styles.root}>
      <Header />
      <Main>{props.children}</Main>
    </div>
  );
};

export default Wrapper;
