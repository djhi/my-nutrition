/* global Meteor */
import { assign, omit } from 'lodash';

export default function(mealCollection, dishesCollection, mealTemplateCollection) {
  return (mealId, name) => {
    const meal = mealCollection.findOne(mealId);

    if (!meal) {
      throw new Meteor.Error(404, 'Meal not found');
    }

    const dishes = dishesCollection.findByMeal(mealId);
    const mealTemplateId = mealTemplateCollection.insert(assign({}, omit(meal, ['_id', 'date']), { name }));

    dishes.forEach(dish => {
      dishesCollection.insert(assign({}, omit(dish, ['_id', 'mealId']), { mealTemplateId }));
    });
  };
}
