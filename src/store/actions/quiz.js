import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
} from '../actions/actionTypes';

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get('/quizes.json');
      const quizes = [];
      Object.keys(response.data).forEach((id, index) => {
        quizes.push({ id, name: `Тест №${index + 1}` });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (reason) {
      dispatch(fetchQuizesError(reason));
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  };
}
