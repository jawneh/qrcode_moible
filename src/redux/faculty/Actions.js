import axios from 'axios';
import {
  FETCH_FACULTIES_REQUEST,
  FETCH_FACULTIES_SUCCESS,
  FETCH_FACULTIES_FAIL,
} from './Constants';
const baseURL = 'https://umar-qrcode.herokuapp.com';
export const fetchFacultiesAction = () => async dispatch => {
  try {
    dispatch({type: FETCH_FACULTIES_REQUEST});
    const {data} = await axios.get(`${baseURL}/faculty`, {timeout: 10000});
    dispatch({type: FETCH_FACULTIES_SUCCESS, payload: data});
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: FETCH_FACULTIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
