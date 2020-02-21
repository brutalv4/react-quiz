import is from 'is_js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { auth } from '../../store/actions/auth';
import classes from './Auth.module.css';

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

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
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

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) =>
      dispatch(auth(email, password, isLogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
