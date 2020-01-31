import React, { Component } from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import classes from './Quiz.module.css';

class Quiz extends Component {
  state = {
    results: {}, // {[id]: 'success'|'error'}
    isFinished: true,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success'|'error' }
    quiz: [
      {
        id: 1,
        question: 'Какого цвета небо?',
        rightAnswerId: 2,
        answers: [
          { id: 1, text: 'Черный' },
          { id: 2, text: 'Синий' },
          { id: 3, text: 'Красный' },
          { id: 4, text: 'Зеленый' },
        ],
      },
      {
        id: 2,
        question: 'В каком году основали Санкт-Петербург?',
        rightAnswerId: 3,
        answers: [
          { id: 1, text: '1700' },
          { id: 2, text: '1702' },
          { id: 3, text: '1703' },
          { id: 4, text: '1803' },
        ],
      },
    ],
  };

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  };

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }
    const question = this.state.quiz[this.state.activeQuestion];

    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[answerId]) {
        results[answerId] = 'success';
      }

      this.setState(() => ({
        answerState: { [answerId]: 'success' },
        results,
      }));

      console.log('Correct answer!');
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState(() => ({ isFinished: true }));
        } else {
          this.setState(prev => ({
            activeQuestion: prev.activeQuestion + 1,
            answerState: null,
          }));
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[answerId] = 'error';
      this.setState(() => ({ answerState: { [answerId]: 'error' }, results }));
      console.log('Wrong answer!');
    }
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {this.state.isFinished ? (
            <FinishedQuiz results={this.state.results} quiz={this.state.quiz} />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLenght={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
