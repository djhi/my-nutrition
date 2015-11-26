/* global Accounts */
import { assign, omit } from 'lodash';

export default function(mealTemplatesCollection, inviteCollection, determineEmail, setUserCoach) {
  Accounts.onCreateUser((options, user) => {
    const invitation = inviteCollection.findOne({
      email: determineEmail(user),
    });

    const mealTemplates = mealTemplatesCollection.find({ userId: { $exists: false } });

    mealTemplates.forEach(mealTemplate => mealTemplatesCollection.insert(assign({}, omit(mealTemplate, '_id'), { userId: user._id })));

    // We still want the default hook's 'profile' behavior.
    if (options.profile) {
      user.profile = options.profile;
    }

    if (invitation) {
      user.roles = [invitation.role];

      if (invitation.role === 'coachee') {
        user.coachId = invitation.userId;
      }

      if (invitation.role === 'coach') {
        setUserCoach(invitation.userId, user._id);
      }
    }

    return user;
  });
}
