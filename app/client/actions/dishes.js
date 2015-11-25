/* global Meteor */
import { assign, omit } from 'lodash';

export function copyDishToMealFactory() {
  return (dishId, mealId, position) => {
    return dispatch => {
      dispatch({
        type: 'DISHES_COPY',
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
  };
}

export function moveDishToMealFactory() {
  return (dishId, mealId, position) => {
    return dispatch => {
      dispatch({
        type: 'DISHES_MOVE',
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
  };
}

export function newMealDishFactory(collection) {
  return (mealId, dish) => {
    return dispatch => {
      dispatch({
        type: 'DISHES_INSERT',
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
        type: 'DISHES_REMOVE',
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
        type: 'DISHES_UPDATE',
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
