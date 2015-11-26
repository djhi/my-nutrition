export default function(userCollection) {
  return (requesterId, requestedId) => {
    return !!userCollection.findOne({
      _id: requestedId,
      coachId: requesterId,
    });
  };
}
