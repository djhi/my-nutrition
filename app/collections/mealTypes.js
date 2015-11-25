/* global Meteor, Mongo, SimpleSchema */
import addUserOnInsert from './common/addUserOnInsert';
import lodash from 'lodash';

export const MealTypes = {
  Breakfast: 'Breakfast',
  Collation: 'Collation',
  Lunch: 'Lunch',
  Supper: 'Supper',
};

export const MealTypeDefaultSchema = new SimpleSchema({
  name: {
    type: String,
    max: 50,
  },
  type: {
    type: String,
    allowedValues: lodash.values(MealTypes),
  },
  time: {
    type: Date,
  },
  userId: {
    type: String,
    optional: true,
    autoValue: function autoValue() {
      return addUserOnInsert(this);
    },
  },
});

export const MealTypeDefaults = new Mongo.Collection('meal_type_defaults');
MealTypeDefaults.attachSchema(MealTypeDefaultSchema);
