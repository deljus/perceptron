// @flow
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import logger from 'redux-logger'
import * as reducers from './reducers';

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  applyMiddleware(logger),
);

export default store;
