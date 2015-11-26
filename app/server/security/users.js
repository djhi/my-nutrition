/**
 * Apply the security rules on the Meteor.users collection
 */
export default function(userCollection) {
  userCollection.deny({
    // No update allowed from client side code
    update: () => false,
  });
}
