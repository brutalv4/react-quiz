import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.css';

const quizes = [1, 2, 3];

class QuizList extends Component {
  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          <ul>
            {quizes.map((quiz, index) => (
              <li key={index}>
                <NavLink to={`/quiz/${quiz}`}>Тест {quiz}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default QuizList;
