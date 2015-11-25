import moment from 'moment';
import { assign } from 'lodash';
import { MealTypes } from '../../collections/mealTypes';

export const DefaultMealTypes = [{
  name: 'Petit déjeuner',
  type: MealTypes.Breakfast,
  time: moment().hour(8).minute(0).second(0).toDate(),
}, {
  name: 'Déjeuner',
  type: MealTypes.Lunch,
  time: moment().hour(13).minute(30).second(0).toDate(),
}, {
  name: 'Dîner',
  type: MealTypes.Supper,
  time: moment().hour(21).minute(0).second(0).toDate(),
}, {
  name: 'Collation',
  type: MealTypes.Collation,
  time: moment().hour(11).minute(0).second(0).toDate(),
}];

export default function(mealTypeDefaultCollection, userCollection) {
  if (mealTypeDefaultCollection.find().count() === 0) {
    DefaultMealTypes.forEach(mealDefault => mealTypeDefaultCollection.insert(mealDefault));
  }

  userCollection.find().forEach(user => {
    if (mealTypeDefaultCollection.find({ userId: user._id }).count() === 0) {
      DefaultMealTypes.forEach(mealDefault => mealTypeDefaultCollection.insert(assign({}, mealDefault, { userId: user._id })));
    }
  });
}
