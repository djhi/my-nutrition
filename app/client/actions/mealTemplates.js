/* global Meteor */
import moment from 'moment';
import actionTypeBuilder from './actionTypeBuilder';

export const MEAL_TEMPLATES = actionTypeBuilder.type('MEAL_TEMPLATES');
export const MEAL_TEMPLATES_REMOVE = actionTypeBuilder.type('MEAL_TEMPLATES_REMOVE');
export const MEAL_TEMPLATES_NEW_FROM_MEAL = actionTypeBuilder.type('MEAL_TEMPLATES_NEW_FROM_MEAL');
export const MEALS_NEW_FROM_MEAL_TEMPLATE = actionTypeBuilder.type('MEALS_NEW_FROM_MEAL_TEMPLATE');

export function loadMealTemplatesFactory(collection) {
  return () => {
    return dispatch => {
      dispatch({
        type: MEAL_TEMPLATES,
        meteor: {
          subscribe: () => Meteor.subscribe('mealTemplates'),
          get: () => collection.find({}, { sort: { time: 1 }}).fetch().sort((x, y) => {
            if (!x.time || x.time > y.time) {
              return 1;
            }
            if (!y.time || x.time < y.time) {
              return -1;
            }

            return 0;
          }),
        },
      });
    };
  };
}

export function deleteMealTemplateFactory(collection) {
  return id => {
    return dispatch => {
      dispatch({
        type: MEAL_TEMPLATES_REMOVE,
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

export function newMealTemplate(mealId, name) {
  return dispatch => {
    dispatch({
      type: MEAL_TEMPLATES_NEW_FROM_MEAL,
      meteor: {
        call: {
          method: 'createMealTemplate',
          parameters: [
            mealId,
            name,
          ],
        },
      },
    });
  };
}

export function newMealFromTemplate(mealTemplateId, date) {
  return dispatch => {
    dispatch({
      type: MEALS_NEW_FROM_MEAL_TEMPLATE,
      meteor: {
        call: {
          method: 'createMealFromTemplate',
          parameters: [
            mealTemplateId,
            moment(date).toDate(),
          ],
        },
      },
    });
  };
}
