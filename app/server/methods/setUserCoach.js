export default function(userCollection) {
  return (userId, coachId) => {
    return userCollection.update(userId, {
      $set: {
        coachId,
      },
    });
  };
}
