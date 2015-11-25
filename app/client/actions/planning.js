/* global Meteor */
import { pushState } from 'redux-router';
import moment from 'moment';
export const DATE_CHANGED = 'DATE_CHANGED';

export function setPlanningDate(dateSelected, userId, userName) {
  return dispatch => {
    if (userId) {
      return dispatch(pushState(null, `/planning/${userId}/${userName}/${moment(dateSelected).format('YYYY-MM-DD')}`));
    }

    return dispatch(pushState(null, `/planning/${moment(dateSelected).format('YYYY-MM-DD')}`));
  };
}
