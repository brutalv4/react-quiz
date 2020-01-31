import React from 'react';
import { default as classses } from './FinishedQuiz.module.css';

const FinishedQuiz = props => {
  return (
    <div className={classses.FinishedQuiz}>
      <ul>
        {props.quiz.map((question, index) => {
          let icon;

          return (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {question}
            </li>
          );
        })}
        {/* <li>
          <strong>1. </strong>How are you
          <FontAwesomeIcon icon={faTimes} className={classes.error} />
        </li>
        <li>
          <strong>2. </strong>How are you
          <FontAwesomeIcon icon={faCheck} className={classes.success} />
        </li> */}
      </ul>
      <p>Правильно 4 из 10</p>
      <div className="">
        <button>Повторить</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
