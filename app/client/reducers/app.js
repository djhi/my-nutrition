import { assign } from 'lodash';
import { SET_TITLE } from '../actions/app';

export const initialState = {
  title: 'Ma nutrition',
};

export default function(state = initialState, action) {
  const { title, type } = action;

  switch (type) {
  case SET_TITLE:
    return assign({}, state, { title });

  default:
    return state;
  }
}
