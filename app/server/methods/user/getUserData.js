export default function(userCollection) {
  return (_id) => {
    return userCollection.find({
      _id,
    }, {
      fields: {
        coachId: 1,
        profile: 1,
        registered_emails: 1,
      },
    });
  };
}
