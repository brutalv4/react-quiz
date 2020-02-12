import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';

class Auth extends Component {
  loginHandler = () => {
    console.log('logged in');
  };

  registerHandler = () => {
    console.log('registered');
  };

  submitHandler = event => {
    event.preventDefault();
    console.log('submit');
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            <Input label="Email" />
            <Input label="Пароль" errorMessage={'TEST'} />
            <Button type="success" onClick={this.loginHandler}>
              Войти
            </Button>
            <Button type="primary" onClick={this.registerHandler}>
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
