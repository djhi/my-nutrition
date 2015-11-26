/* global Meteor */
import { assign, omit } from 'lodash';

export default function(mealCollection, dishesCollection, mealTemplateCollection) {
  return (mealId, name) => {
    const meal = mealCollection.findOne(mealId);

    if (!meal) {
      throw new Meteor.Error(404, 'Meal not found');
    }

    const mealTemplate = mealTemplateCollection.findOne({name, userId: meal.userId});
    let mealTemplateId;
    const mealTemplateData = assign({}, omit(meal, ['_id', 'date']), { name, time: meal.date });

    if (mealTemplate) {
      mealTemplateId = mealTemplate._id;
      mealTemplateCollection.update(mealTemplateId, {
        $set: mealTemplateData,
      });
    } else {
      mealTemplateId = mealTemplateCollection.insert(mealTemplateData);
    }

    const dishes = dishesCollection.findByMeal(mealId);
    dishes.forEach(dish => {
      dishesCollection.insert(assign({}, omit(dish, ['_id', 'mealId']), { mealTemplateId }));
    });
  };
}
