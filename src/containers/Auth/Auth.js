import axios from 'axios';
import is from 'is_js';
import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';

const APP_KEY = process.env.REACT_APP_FIREBASE_APP_KEY;

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APP_KEY}`,
        authData
      );
      console.log(response.data);
    } catch (reason) {
      console.error(reason);
    }
  };

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APP_KEY}`,
        authData
      );
      console.log(response.data);
    } catch (reason) {
      console.error(reason);
    }
  };

  validateCtrl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, ctrlName) => {
    const formControls = { ...this.state.formControls };
    const ctrl = { ...formControls[ctrlName] };

    ctrl.value = event.target.value;
    ctrl.touched = true;
    ctrl.valid = this.validateCtrl(ctrl.value, ctrl.validation);

    formControls[ctrlName] = ctrl;

    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({ formControls, isFormValid });
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form
            onSubmit={event => event.preventDefault()}
            className={classes.AuthForm}
          >
            {Object.keys(this.state.formControls).map((ctrlName, index) => {
              const ctrl = this.state.formControls[ctrlName];
              return (
                <Input
                  key={ctrlName + index}
                  type={ctrl.type}
                  value={ctrl.value}
                  shouldValidate={!!ctrl.validation}
                  valid={ctrl.valid}
                  touched={ctrl.touched}
                  label={ctrl.label}
                  errorMessage={ctrl.errorMessage}
                  onChange={event => {
                    this.onChangeHandler(event, ctrlName);
                  }}
                />
              );
            })}
            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
