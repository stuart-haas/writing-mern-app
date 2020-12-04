import React, { Fragment } from 'react';
import Main from 'components/main/Main';
import Sidebar from 'components/sidebar/Sidebar';
import Menu from 'components/menu/Menu';
interface Props {
  children: JSX.Element | JSX.Element[];
}

const Container = (props: Props) => {
  return (
    <Fragment>
      <div className='container'>
        <Sidebar isOpen={true}>
          <Menu />
        </Sidebar>
        <Main>{props.children}</Main>
      </div>
    </Fragment>
  );
};

export default Container;
