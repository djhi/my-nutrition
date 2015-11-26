/* global Meteor */
import { assign, omit } from 'lodash';

export default function(dishCollection, incrementDishesPosition, updateMealDishes) {
  return (dishId, mealId, position) => {
    const dish = dishCollection.findOne(dishId);
    let finalPosition = position;

    if (!dish) {
      throw new Meteor.Error(404, 'Dish not found');
    }

    if (typeof position === 'undefined' || position === null) {
      finalPosition = dishCollection.findByMeal(mealId).count();
    }

    // Push dishes from target meal
    incrementDishesPosition(mealId, finalPosition);

    dishCollection.direct.insert(assign({}, omit(dish, '_id'), { mealId, position: finalPosition }));
    updateMealDishes(mealId);
  };
}
