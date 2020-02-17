import axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.css';

class QuizList extends Component {
  state = {
    quizes: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://react-quiz-13580.firebaseio.com/quizes.json'
      );
      const quizes = [];
      Object.keys(response.data).forEach((id, index) => {
        quizes.push({ id, name: `Тест №${index + 1}` });
      });

      this.setState({ quizes });
    } catch (reason) {
      console.error(reason);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          <ul>
            {this.state.quizes.map(quiz => (
              <li key={quiz.id}>
                <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default QuizList;
