/* global Meteor */
import { assign, omit } from 'lodash';
import moment from 'moment';

export default function(mealCollection, dishesCollection, mealTemplateCollection) {
  return (mealTemplateId, date) => {
    const mealTemplate = mealTemplateCollection.findOne(mealTemplateId);

    if (!mealTemplate) {
      throw new Meteor.Error(404, 'MealTemplate not found');
    }

    const mealTemplateMoment = moment(mealTemplate.time);

    const mealMoment = moment(date)
      .hour(mealTemplateMoment.hour())
      .minute(mealTemplateMoment.minute());

    const dishes = dishesCollection.findByMealTemplate(mealTemplateId);
    const mealId = mealCollection.insert(assign({}, omit(mealTemplate, '_id'), { date: mealMoment.toDate() }));

    dishes.forEach(dish => {
      dishesCollection.insert(assign({}, omit(dish, ['_id', 'mealTemplateId']), { mealId }));
    });
  };
}
