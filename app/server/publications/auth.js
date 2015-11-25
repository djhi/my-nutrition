/* global Meteor */
export default function(getUserData) {
  Meteor.publish('userData', function publishUserData() {
    return getUserData(this.userId);
  });
}
