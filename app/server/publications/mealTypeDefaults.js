/* global Meteor */
export default function(mealTypeDefaultCollection) {
  Meteor.publish('mealTypeDefaults', function publishMealTypeDefaults() {
    return mealTypeDefaultCollection.find({ userId: this.userId });
  });
}
