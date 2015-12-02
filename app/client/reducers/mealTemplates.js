import { assign } from 'lodash';
import actionTypeBuilder from '../actions/actionTypeBuilder';
import { MEAL_TEMPLATES } from '../actions/mealTemplates';

export const initialState = {
  items: [],
  ready: false,
};

export default function(state = initialState, action) {
  const {data, ready, type} = action;

  switch (type) {
  case actionTypeBuilder.ready(MEAL_TEMPLATES):
    return assign({}, state, {
      ready,
    });

  case actionTypeBuilder.changed(MEAL_TEMPLATES):
    return assign({}, state, {
      items: data,
    });

  default:
    return state;
  }
}
