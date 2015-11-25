export default function(userCollection) {
  return (requesterId, requestedId) => {
    return userCollection.update(requestedId, {
      $set: {
        coachId: requesterId,
      },
    });
  };
}
