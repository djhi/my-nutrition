/* global Meteor */
import { updatePath } from 'redux-simple-router';
import moment from 'moment';
import actionTypeBuilder from './actionTypeBuilder';

export const DATE_CHANGED = actionTypeBuilder.type('DATE_CHANGED');

export function setPlanningDate(dateSelected, userId, userName) {
  return dispatch => {
    if (userId) {
      return dispatch(updatePath(`/planning/${userId}/${userName}/${moment(dateSelected).format('YYYY-MM-DD')}`));
    }

    return dispatch(updatePath(`/planning/${moment(dateSelected).format('YYYY-MM-DD')}`));
  };
}
