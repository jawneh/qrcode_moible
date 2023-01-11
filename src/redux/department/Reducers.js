import {
  FETCH_DEPARTMENTS_REQUEST,
  FETCH_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_FAIL,
} from './Constants';

export const fetchDepartmentsReducer = (state = {departments: []}, action) => {
  switch (action.type) {
    case FETCH_DEPARTMENTS_REQUEST:
      return {loading: true};
    case FETCH_DEPARTMENTS_SUCCESS:
      return {loading: false, departments: action.payload};
    case FETCH_DEPARTMENTS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};
