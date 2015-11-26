/* global Meteor */

/**
 * Publishes the meal templates for the currently logged in user
 */
export default function(mealTemplateCollection) {
  Meteor.publish('mealTemplates', function publishMealTemplates() {
    return mealTemplateCollection.find({ userId: this.userId });
  });
}
