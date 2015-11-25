import { assign } from 'lodash';

export const initialState = {
  current: null,
  items: [],
  ready: false,
};

export default function(state = initialState, action) {
  const { data, ready, type } = action;

  switch (type) {
  case 'COACHEES_READY':
    return assign({}, state, { ready });

  case 'COACHEES_CHANGED':
    return assign({}, state, { items: data });

  case 'COACHEE_READY':
    return assign({}, state, { ready });

  case 'COACHEE_CHANGED':
    return assign({}, state, { current: data });

  default:
    return state;
  }
}
