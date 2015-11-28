import { applyMiddleware, compose, createStore } from 'redux';
import { syncReduxAndRouter } from 'redux-simple-router';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import meteorDatasource from '../middlewares/meteorDatasource';
import meteorSubscription from '../middlewares/meteorSubscription';
import meteorMethod from '../middlewares/meteorMethod';
import { meteorInsert, meteorUpdate, meteorRemove } from '../middlewares/meteorCrud';
import { newSuccessNotification, newErrorNotification } from '../actions/notifications';

const loggerMiddleware = createLogger();

import rootReducer from '../reducers';

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
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(history, initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  syncReduxAndRouter(history, store, state => state.router);

  return store;
}
