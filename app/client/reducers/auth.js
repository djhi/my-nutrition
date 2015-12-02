import { assign } from 'lodash';
import actionTypeBuilder from '../actions/actionTypeBuilder';
import { USER_LOGGING_IN, USER_DATA } from '../actions/auth';

export const initialState = {
  user: null,
  loggingIn: false,
};

export default function(state = initialState, action) {
  const { data, type } = action;

  switch (type) {
  case actionTypeBuilder.changed(USER_DATA):
    return assign({}, state, { user: data });

  case actionTypeBuilder.changed(USER_LOGGING_IN):
    return assign({}, state, { loggingIn: data });

  default:
    return state;
  }
}
