import { combineReducers } from 'redux';
import todos from './todos';
import form from './form';

export default combineReducers({
  todos,
  form
});