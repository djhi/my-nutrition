import { assign } from 'lodash';
import { routerStateReducer } from 'redux-router';

export const initialState = {
};

export default function(state = initialState, action) {
  console.log({action});
  return routerStateReducer(state, action);
}
