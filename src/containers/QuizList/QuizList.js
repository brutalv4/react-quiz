import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuizes } from '../../store/actions/quiz';
import classes from './QuizList.module.css';

class QuizList extends Component {
  componentDidMount() {
    this.props.fetchQuizes();
  }

  renderQuizes = () => {
    return this.props.quizes.map(quiz => (
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
          {this.props.loading && this.props.quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>{this.renderQuizes()}</ul>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { quizes, loading } = state.quiz;
  return {
    quizes,
    loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
