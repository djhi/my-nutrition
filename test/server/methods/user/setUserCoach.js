/* eslint no-unused-expressions: 0 */
/* global Accounts, beforeEach, describe, it, expect, sinon */
import setUserCoachFactory from 'app/server/methods/user/setUserCoach';

describe('server', () => {
  describe('methods', () => {
    describe('setUserCoach', () => {
      const userCollection = {
        update: sinon.stub(),
      };

      beforeEach(() => {
        userCollection.update.reset();
      });

      it('should update the specified user, settings its coach_id property', () => {
        setUserCoachFactory(userCollection)('user_id', 'coach_id');

        expect(userCollection.update).to.have.been.calledWith('user_id', {
          $set: {
            coachId: 'coach_id',
          },
        });
      });
    });
  });
});
