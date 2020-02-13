import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';

class Auth extends Component {
  state = {
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

  validateCtrl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = re.test(String(value).toLowerCase()) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, ctrlName) => {
    console.log(ctrlName, event.target.value);

    const formControls = { ...this.state.formControls };
    const ctrl = { ...formControls[ctrlName] };

    ctrl.value = event.target.value;
    ctrl.touched = true;
    ctrl.valid = this.validateCtrl(ctrl.value, ctrl.validation);

    formControls[ctrlName] = ctrl;

    this.setState({ formControls });
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
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
