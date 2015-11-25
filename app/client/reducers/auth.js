import { assign } from 'lodash';

export const initialState = {
  user: null,
  loggingIn: false,
};

export default function(state = initialState, action) {
  const { data, type } = action;

  switch (type) {
  case 'USER_DATA_CHANGED':
    return assign({}, state, { user: data });

  case 'USER_LOGGING_IN_CHANGED':
    return assign({}, state, { loggingIn: data });

  default:
    return state;
  }
}
