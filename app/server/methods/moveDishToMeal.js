/* global Meteor */
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
    incrementDishesPosition(mealId, finalPosition, 1);
    // Pull dishes from source meal
    incrementDishesPosition(dish.mealId, dish.position + 1, -1);

    dishCollection.direct.update(dishId, {
      $set: {
        mealId,
        position: finalPosition,
      },
    });

    updateMealDishes(mealId);
    updateMealDishes(dish.mealId);
  };
}
