/* global Mongo, SimpleSchema */
import lodash from 'lodash';
import { DishReferenceSchema } from './dishes';
import { MealTypes } from './mealTypes';
import addUserOnInsert from './common/addUserOnInsert';

export const MealTemplateSchema = new SimpleSchema({
  name: {
    type: String,
    max: 50,
  },
  type: {
    type: String,
    allowedValues: lodash.values(MealTypes),
  },
  dishes: {
    type: [DishReferenceSchema],
    defaultValue: [],
  },
  userId: {
    type: String,
    autoValue: function autoValue() {
      return addUserOnInsert(this);
    },
  },
});

export const MealTemplates = new Mongo.Collection('meals_templates');
