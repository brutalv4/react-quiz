import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { createControl } from '../../form/formFramework';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import classes from './QuizCreator.module.css';

const createOptionControl = number => {
  return createControl(
    {
      id: number,
      label: `Вариант ${number}`,
      errorMessage: 'Значение не может быть пустым',
    },
    { required: true }
  );
};

const createFormControls = () => {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
};

class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createFormControls(),
  };

  submitHandler = event => {
    event.preventDefault();
  };

  addQuestionHandler = () => {};

  createQuizHandler = () => {};

  onChangeHandler = (value, ctrlName) => {};

  renderControls = () => {
    return Object.keys(this.state.formControls).map((ctrlName, index) => {
      const ctrl = this.state.formControls[ctrlName];
      return (
        <Auxilary key={ctrlName + index}>
          <Input
            type={ctrl.type}
            label={ctrl.label}
            value={ctrl.value}
            valid={ctrl.valid}
            shouldValidate={!!ctrl.validation}
            touched={ctrl.touched}
            errorMessage={ctrl.errorMessage}
            onChange={event => {
              this.onChangeHandler(event.target.value, ctrlName);
            }}
          />
          {index === 0 ? <hr /> : null}
        </Auxilary>
      );
    });
  };

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            <select></select>
            <Button type="primary" onClick={this.addQuestionHandler}>
              Добавить вопрос
            </Button>
            <Button type="success" onClick={this.createQuizHandler}>
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
