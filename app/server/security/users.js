export default function(userCollection) {
  userCollection.deny({
    update: () => false,
  });
}
