import React from 'react';
import styles from './main.module.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Main = (props: Props) => {
  return <main className={styles.root}>{props.children}</main>;
};

export default Main;
