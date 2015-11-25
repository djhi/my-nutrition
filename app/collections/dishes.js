/* global Mongo, SimpleSchema */
import findByMealFactory from './dishes/findByMeal';
import findByMealTemplateFactory from './dishes/findByMealTemplate';
import addUserOnInsert from './common/addUserOnInsert';

const DishBaseSchema = new SimpleSchema({
  description: {
    type: String,
    optional: true,
  },
  label: {
    type: String,
    max: 50,
  },
  mealId: {
    type: String,
    optional: true,
  },
  mealTemplateId: {
    type: String,
    optional: true,
  },
  portions: {
    type: Number,
    min: 1,
    defaultValue: 1,
  },
  position: {
    type: Number,
    min: 0,
  },
});

export const DishReferenceSchema = new SimpleSchema([DishBaseSchema, {
  _id: {
    type: String,
  },
}]);

export const DishSchema = new SimpleSchema([DishBaseSchema, {
  userId: {
    type: String,
    autoValue: function autoValue() {
      return addUserOnInsert(this);
    },
  },
}]);

export const Dishes = new Mongo.Collection('dishes');
Dishes.attachSchema(DishSchema);

Dishes.findByMeal = findByMealFactory(Dishes);
Dishes.findByMealTemplate = findByMealTemplateFactory(Dishes);
