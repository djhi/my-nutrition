/* global Meteor */
export default function(userCollection) {
  Meteor.publish('coachees', function publishCoachees() {
    return userCollection.find({
      coachId: this.userId,
    }, {
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
