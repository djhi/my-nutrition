/* global Accounts, Random */
export default function(inviteCollection, sendInvitation) {
  return (userId, email) => {
    const invitation = inviteCollection.findOne({
      userId,
      email,
    });

    const token = Random.hexString(10);

    if (invitation) {
      inviteCollection.update(invitation._id, {
        $set: {
          sentAt: new Date(),
          token,
        },
      });
    } else {
      inviteCollection.insert({
        userId,
        email,
        sentAt: new Date(),
        token,
        role: 'coach',
      });
    }

    sendInvitation(userId, email, token);
  };
}
