/* global Meteor */
export function loadMealTypeDefaultsFactory(collection) {
  return () => {
    return dispatch => {
      dispatch({
        type: 'MEAL_TYPE_DEFAULTS',
        meteor: {
          subscribe: () => Meteor.subscribe('mealTypeDefaults'),
          get: () => collection.find().fetch(),
        },
      });
    };
  };
}
