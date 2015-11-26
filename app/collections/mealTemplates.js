/* global Mongo, SimpleSchema */
import lodash from 'lodash';
import { DishReferenceSchema } from './dishes';
import addUserOnInsert from './common/addUserOnInsert';

export const MealTypes = {
  Breakfast: 'Breakfast',
  Collation: 'Collation',
  Lunch: 'Lunch',
  Supper: 'Supper',
};

export const MealTemplateSchema = new SimpleSchema({
  name: {
    type: String,
    max: 50,
  },
  dishes: {
    type: [DishReferenceSchema],
    defaultValue: [],
  },
  time: {
    type: Date,
    optional: true,
  },
  type: {
    type: String,
    allowedValues: lodash.values(MealTypes),
  },
  userId: {
    type: String,
    autoValue: function autoValue() {
      return addUserOnInsert(this);
    },
  },
});

export const MealTemplates = new Mongo.Collection('meals_templates');
