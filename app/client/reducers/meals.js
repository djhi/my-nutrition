import { assign } from 'lodash';
import actionTypeBuilder from '../actions/actionTypeBuilder';
import { MEALS } from '../actions/meals';

export const initialState = {
  items: [],
  ready: false,
};

export default function(state = initialState, action) {
  const { data, ready, type } = action;

  switch (type) {
  case actionTypeBuilder.ready(MEALS):
    return assign({}, state, { ready });

  case actionTypeBuilder.changed(MEALS):
    return assign({}, state, { items: data });

  default:
    return state;
  }
}
