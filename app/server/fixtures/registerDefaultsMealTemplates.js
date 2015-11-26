import moment from 'moment';
import { assign } from 'lodash';
import { MealTypes } from 'app/collections/mealTemplates';

export const DefaultMealTemplates = [{
  name: 'Petit déjeuner',
  type: MealTypes.Breakfast,
  time: moment().hour(8).minute(0).second(0).toDate(),
}, {
  name: 'Déjeuner',
  type: MealTypes.Lunch,
  time: moment().hour(13).minute(0).second(0).toDate(),
}, {
  name: 'Dîner',
  type: MealTypes.Supper,
  time: moment().hour(21).minute(0).second(0).toDate(),
}, {
  name: 'Collation du matin',
  type: MealTypes.Collation,
  time: moment().hour(11).minute(0).second(0).toDate(),
}, {
  name: 'Collation de l\'après-midi',
  type: MealTypes.Collation,
  time: moment().hour(17).minute(0).second(0).toDate(),
}, {
  name: 'Collation',
  type: MealTypes.Collation,
}];

export default function(mealTemplatesCollection, userCollection) {
  if (mealTemplatesCollection.find().count() === 0) {
    DefaultMealTemplates.forEach(mealDefault => mealTemplatesCollection.insert(mealDefault));
  }

  userCollection.find().forEach(user => {
    if (mealTemplatesCollection.find({ userId: user._id }).count() === 0) {
      DefaultMealTemplates.forEach(mealDefault => mealTemplatesCollection.insert(assign({}, mealDefault, { userId: user._id })));
    }
  });
}
