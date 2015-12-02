/* global Meteor */
import { assign, omit } from 'lodash';
import actionTypeBuilder from './actionTypeBuilder';

export const DISHES_COPY = actionTypeBuilder.type('DISHES_COPY');
export const DISHES_MOVE = actionTypeBuilder.type('DISHES_MOVE');
export const DISHES_INSERT = actionTypeBuilder.type('DISHES_INSERT');
export const DISHES_REMOVE = actionTypeBuilder.type('DISHES_REMOVE');
export const DISHES_UPDATE = actionTypeBuilder.type('DISHES_UPDATE');

export function copyDishToMeal(dishId, mealId, position) {
  return dispatch => {
    dispatch({
      type: DISHES_COPY,
      meteor: {
        call: {
          method: 'copyDishToMeal',
          parameters: [
            dishId,
            mealId,
            position,
          ],
        },
      },
    });
  };
}

export function moveDishToMeal(dishId, mealId, position) {
  return dispatch => {
    dispatch({
      type: DISHES_MOVE,
      meteor: {
        call: {
          method: 'moveDishToMeal',
          parameters: [
            dishId,
            mealId,
            position,
          ],
        },
      },
    });
  };
}

export function newMealDishFactory(collection) {
  return (mealId, dish) => {
    return dispatch => {
      dispatch({
        type: DISHES_INSERT,
        meteor: {
          insert: {
            entity: assign({}, dish, { mealId }),
            collection,
          },
        },
      });
    };
  };
}

export function deleteMealDishFactory(collection) {
  return id => {
    return dispatch => {
      dispatch({
        type: DISHES_REMOVE,
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

export function updateMealDishFactory(collection) {
  return (dish) => {
    return dispatch => {
      dispatch({
        type: DISHES_UPDATE,
        meteor: {
          update: {
            id: dish._id,
            modifiers: {
              $set: omit(dish, '_id'),
            },
            collection,
          },
        },
      });
    };
  };
}
