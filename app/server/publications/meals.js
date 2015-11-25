/* global Meteor */
export default function(mealCollection, checkUserHasAccessToUserPlanning) {
  Meteor.publish('meals', function publishMeals(dateStart, dateEnd, userId) {
    if (userId && userId !== this.userId && !checkUserHasAccessToUserPlanning(this.userId, userId)) {
      return this.error(new Meteor.Error(401, 'Unauthorized'));
    }

    const meals = mealCollection.findByUserAndDate(userId || this.userId, dateStart, dateEnd);
    return meals;
  });
}
