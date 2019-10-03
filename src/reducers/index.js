import { combineReducers } from 'redux';
import email from './todos';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
  email,
  visibilityFilter,
});
