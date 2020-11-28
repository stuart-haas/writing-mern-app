import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Main = (props: Props) => {
  return <main>{props.children}</main>;
};

export default Main;
