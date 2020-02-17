import React, { Component } from 'react';
import axios from '../../axios/axios-quiz';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import {
  createControl,
  validate,
  validateForm,
} from '../../form/formFramework';
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
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };

  submitHandler = event => {
    event.preventDefault();
  };

  addQuestionHandler = event => {
    event.preventDefault();

    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id,
        },
        {
          text: option2.value,
          id: option2.id,
        },
        {
          text: option3.value,
          id: option3.id,
        },
        {
          text: option4.value,
          id: option4.id,
        },
      ],
    };

    quiz.push(questionItem);
    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };

  createQuizHandler = async event => {
    event.preventDefault();

    try {
      await axios.post('/quizes.json', this.state.quiz);

      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  onChangeHandler = (value, ctrlName) => {
    const formControls = { ...this.state.formControls };
    const ctrl = { ...formControls[ctrlName] };

    ctrl.touched = true;
    ctrl.value = value;
    ctrl.valid = validate(ctrl.value, ctrl.validation);

    formControls[ctrlName] = ctrl;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

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

  selectChangeHandler = event => {
    this.setState({ rightAnswerId: +event.target.value });
  };

  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            {select}
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
