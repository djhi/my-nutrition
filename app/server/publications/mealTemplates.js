/* global Meteor */
export default function(mealTemplateCollection) {
  Meteor.publish('mealTemplates', function publishMealTemplates() {
    return mealTemplateCollection.find({ userId: this.userId });
  });
}
