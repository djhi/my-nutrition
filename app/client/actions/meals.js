/* global Meteor */
import moment from 'moment';
import { newErrorNotification } from './notifications';
import actionTypeBuilder from './actionTypeBuilder';

export const MEALS = actionTypeBuilder.type('MEALS');
export const MEALS_REMOVE = actionTypeBuilder.type('MEALS_REMOVE');
export const MEALS_INSERT = actionTypeBuilder.type('MEALS_INSERT');
export const MEALS_UPDATE = actionTypeBuilder.type('MEALS_UPDATE');

export function loadMealsFactory(mealCollection) {
  return (userId, date) => {
    const dateStart = moment(date).startOf('day').toDate();
    const dateEnd = moment(date).endOf('day').toDate();
    const finalUserId = userId || Meteor.userId(); // Override with current user if not specified

    return dispatch => {
      dispatch({
        type: MEALS,
        meteor: {
          subscribe: () => Meteor.subscribe('meals', dateStart, dateEnd, finalUserId, {
            onStop: error => {
              if (error && error.error === 401) {
                dispatch(newErrorNotification("Vous n'avez pas accès au planning de cet utilisateur."));
              }
            },
          }),
          get: () => mealCollection.findByUserAndDate(finalUserId, dateStart, dateEnd).fetch(),
        },
      });
    };
  };
}

export function deleteMealFactory(collection) {
  return id => {
    return dispatch => {
      dispatch({
        type: MEALS_REMOVE,
        meteor: {
          remove: {
            id,
            collection,
          },
        },
      });
    };
  };
}

export function newMealFactory(collection) {
  return (type, name, date) => {
    return dispatch => {
      dispatch({
        type: MEALS_INSERT,
        meteor: {
          insert: {
            entity: {
              date,
              name,
              type,
            },
            collection,
          },
        },
      });
    };
  };
}

export function updateMealTimeFactory(collection) {
  return (id, date) => {
    return dispatch => {
      dispatch({
        type: MEALS_UPDATE,
        meteor: {
          update: {
            id,
            modifiers: {
              $set: {
                date: moment(date).toDate(),
              },
            },
            collection,
          },
        },
      });
    };
  };
}
