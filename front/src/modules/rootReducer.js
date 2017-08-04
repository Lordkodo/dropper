import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import drop from './drop/DropReducer.js';

export default combineReducers({
  router: routerReducer,
  drop,
})
