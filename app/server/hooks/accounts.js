/* global Accounts */
import { assign, omit } from 'lodash';

export default function(mealTypeDefaultCollection, inviteCollection, determineEmail, setUserCoach) {
  Accounts.onCreateUser((options, user) => {
    const invitation = inviteCollection.findOne({
      email: determineEmail(user),
    });

    const mealTypeDefaults = mealTypeDefaultCollection.find({ userId: { $exists: false } });

    mealTypeDefaults.forEach(mealTypeDefault => mealTypeDefaultCollection.insert(assign({}, omit(mealTypeDefault, '_id'), { userId: user._id })));

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
