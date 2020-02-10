import React, { Component } from 'react';
import classes from './Auth.module.css';

class Auth extends Component {
  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
        </div>
      </div>
    );
  }
}

export default Auth;
