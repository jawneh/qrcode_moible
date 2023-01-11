import axios from 'axios';
import {
  FETCH_DEPARTMENTS_REQUEST,
  FETCH_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_FAIL,
} from './Constants';
const baseURL = 'https://umar-qrcode.herokuapp.com';

export const fetchDepartmentsAction = id => async dispatch => {
  try {
    dispatch({type: FETCH_DEPARTMENTS_REQUEST});
    const {data} = await axios.get(`${baseURL}/department`, {timeout: 10000});
    dispatch({type: FETCH_DEPARTMENTS_SUCCESS, payload: data});
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: FETCH_DEPARTMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
