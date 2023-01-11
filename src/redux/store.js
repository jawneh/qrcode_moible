import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {fetchDepartmentsReducer} from './department/Reducers';
import {fetchFacultiesReducer} from './faculty/Reducers';

const reducer = combineReducers({
  fetchDepartments: fetchDepartmentsReducer,
  fetchFaculties: fetchFacultiesReducer,
});
// const store = () => {
//   return createStore(rootReducer);
// };
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
