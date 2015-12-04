import { assign } from 'lodash';
import { SET_TITLE, SWITCH_LOCALE } from '../actions/app';

export const initialState = {
  title: 'Ma nutrition',
  locale: 'en',
};

export default function(state = initialState, action) {
  const { locale, messages, title, type } = action;

  switch (type) {
  case SET_TITLE:
    return assign({}, state, { title });

  case SWITCH_LOCALE:
    return assign({}, state, { locale, messages });

  default:
    return state;
  }
}
