/* global Accounts, Random */
export default function(inviteCollection, sendInvitation) {
  return (coachId, email) => {
    const invitation = inviteCollection.findOne({
      userId: coachId,
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
        userId: coachId,
        email,
        sentAt: new Date(),
        token,
        role: 'coachee',
      });
    }

    sendInvitation(coachId, email, token);
  };
}
