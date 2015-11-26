/* global Mongo, SimpleSchema */
import lodash from 'lodash';
import findByUserAndDateFactory from './meals/findByUserAndDate';
import isOwner from './common/isOwner';
import takenAt from './meals/takenAt';
import addUserOnInsert from './common/addUserOnInsert';
import { DishReferenceSchema } from './dishes';
import { MealTypes } from './mealTemplates';

export const MealSchema = new SimpleSchema({
  name: {
    type: String,
    max: 50,
  },
  type: {
    type: String,
    allowedValues: lodash.values(MealTypes),
  },
  date: {
    type: Date,
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

export const Meals = new Mongo.Collection('meals');
Meals.attachSchema(MealSchema);

Meals.findByUserAndDate = findByUserAndDateFactory(Meals);

Meals.helpers({
  isOwner: function(userId) { // eslint-disable-line func-names
    return isOwner(this, userId);
  },
  takenAt: function() { // eslint-disable-line func-names
    return takenAt(this);
  },
});
