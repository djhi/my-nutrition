/* global Meteor */

/**
 * Custom publication of the logged in user's data
 */
export default function(getUserData) {
  Meteor.publish('userData', function publishUserData() {
    return getUserData(this.userId);
  });
}
