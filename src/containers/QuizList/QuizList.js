import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';
import classes from './QuizList.module.css';

class QuizList extends Component {
  state = {
    quizes: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/quizes.json');
      const quizes = [];
      Object.keys(response.data).forEach((id, index) => {
        quizes.push({ id, name: `Тест №${index + 1}` });
      });

      this.setState({
        quizes,
        loading: false,
      });
    } catch (reason) {
      console.error(reason);
    }
  }

  renderQuizes = () => {
    return this.state.quizes.map(quiz => (
      <li key={quiz.id}>
        <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
      </li>
    ));
  };

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}

export default QuizList;
