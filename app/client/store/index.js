import { applyMiddleware, compose, createStore } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import meteorDatasource from '../middlewares/meteorDatasource';
import meteorSubscription from '../middlewares/meteorSubscription';
import meteorMethod from '../middlewares/meteorMethod';
import { meteorInsert, meteorUpdate, meteorRemove } from '../middlewares/meteorCrud';
import { newSuccessNotification, newErrorNotification } from '../actions/notifications';

const createHistory = require(`history/lib/createBrowserHistory`);
const loggerMiddleware = createLogger();

import rootReducer from '../reducers';
import routes from '../routes';

const middlewares = [
  thunkMiddleware,
  meteorSubscription,
  meteorDatasource,
  meteorMethod(newSuccessNotification, newErrorNotification),
  meteorInsert(newSuccessNotification, newErrorNotification),
  meteorUpdate(newSuccessNotification, newErrorNotification),
  meteorRemove(newSuccessNotification, newErrorNotification),
  loggerMiddleware,
];

const finalCreateStore = compose(
  applyMiddleware(...middlewares),
  reduxReactRouter({ createHistory, routes }),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
