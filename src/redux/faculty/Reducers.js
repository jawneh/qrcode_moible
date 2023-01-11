import {
  FETCH_FACULTIES_REQUEST,
  FETCH_FACULTIES_SUCCESS,
  FETCH_FACULTIES_FAIL,
} from './Constants';

export const fetchFacultiesReducer = (state = {faculties: []}, action) => {
  switch (action.type) {
    case FETCH_FACULTIES_REQUEST:
      return {loading: true};
    case FETCH_FACULTIES_SUCCESS:
      return {loading: false, faculties: action.payload};
    case FETCH_FACULTIES_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};
