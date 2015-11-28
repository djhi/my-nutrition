/* global Meteor */
export default function(inviteCollection, setAccountRole, setUserCoach) {
  return (userId, token) => {
    const invitation = inviteCollection.findByToken(token);

    if (!invitation) {
      throw new Meteor.Error(404, 'not found', 'invitation cannot be found');
    }

    setAccountRole(userId, invitation.role);

    if (invitation.role === 'coachee') {
      setUserCoach(userId, invitation.userId);
    } else {
      setUserCoach(invitation.userId, userId);
    }

    return invitation.role;
  };
}
