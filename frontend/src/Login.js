import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import auth from './auth';

const CLIENT_ID = '317596678792-2ekdkdrdlgsqdaudaag7t7m7qf4m0b17.apps.googleusercontent.com';

class Login extends Component {
  state = {
    redirectToReferrer: false,
    valid: true,
  };

  login = (response) => {
    auth.authenticate(response);
    if (auth.profile) {
      this.setState({ redirectToReferrer: true, invalid: false });
    } else {
      this.setState({ invalid: true });
    }
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const redirectToReferrer = this.state.redirectToReferrer;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2196f3',
          color: '#FFFFFF',
          textAlign: 'center',
          }}
      >
        <h1>Whitman Books Online</h1>
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={this.login}
          onFailure={this.login}
        />
        {this.state.invalid ?
         <div>
           <hr />
           <h4>Invalid Login</h4>
         </div>
         :
         null
        }
      </div>
    );
  }
}

export default Login;
