export default function(inviteCollection) {
  return token => {
    return inviteCollection.findOne({
      token,
    });
  };
}
