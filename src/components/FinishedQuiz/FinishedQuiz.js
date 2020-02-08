import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const error = props.results[quizItem.id] === 'error';
          return (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {quizItem.question}
              <FontAwesomeIcon
                icon={error ? faTimes : faCheck}
                className={classes[error ? 'error' : 'success']}
              />
            </li>
          );
        })}
      </ul>
      <p>
        Правильно {successCount} из {props.quiz.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>
        <Link to={'/'}>
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
