/* global Meteor */

/**
 * Publishes the users coached by the currently logged in user
 */
export default function(userCollection) {
  Meteor.publish('coachees', function publishCoachees() {
    return userCollection.find({
      coachId: this.userId,
    }, {
      // We just publish this subset of their data
      fields: {
        'registered_emails': 1,
        'profile.name': 1,
      },
      sort: {
        'profile.name': 1,
      },
    });
  });
}
