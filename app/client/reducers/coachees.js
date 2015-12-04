import { assign } from 'lodash';
import actionTypeBuilder from '../actions/actionTypeBuilder';
import { COACHEE, COACHEES } from '../actions/coachees';

export const initialState = {
  current: null,
  items: [],
  ready: false,
};

export default function(state = initialState, action) {
  const { data, ready, type } = action;

  switch (type) {
  case actionTypeBuilder.ready(COACHEES):
    return assign({}, state, { ready });

  case actionTypeBuilder.changed(COACHEES):
    return assign({}, state, { items: data });

  case actionTypeBuilder.ready(COACHEE):
    return assign({}, state, { ready });

  case actionTypeBuilder.changed(COACHEE):
    return assign({}, state, { current: data });

  default:
    return state;
  }
}
