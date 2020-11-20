import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { token } from 'services/api';

interface Props {
  key: string;
}

interface State {
  loading: boolean;
  redirect: boolean;
}

export default function withAuth(ComponentToGuard: any) {
  return class AuthComponent<T> extends Component<T, State> {
    constructor(props: T) {
      super(props);
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      const fetchData = async () => {
        try {
          const response = await token();
          console.log(response);
          if (response.status === 200) {
            this.setState({ loading: false });
          }
        } catch (error) {
          this.setState({ loading: false, redirect: true });
        }
      };
      fetchData();
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to='/login' />;
      }

      return <ComponentToGuard {...this.props} />;
    }
  };
}
