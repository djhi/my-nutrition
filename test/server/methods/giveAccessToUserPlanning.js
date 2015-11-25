/* eslint no-unused-expressions: 0 */
/* global beforeEach, describe, it, expect, sinon */
import giveAccessToUserPlanningFactory from '../../../app/server/methods/giveAccessToUserPlanning';

describe('server', () => {
  describe('methods', () => {
    describe('giveAccessToUserPlanning', () => {
      const userCollection = {
        update: sinon.stub().returns(42),
      };

      beforeEach(() => {
        userCollection.update.reset();
      });

      it('should call findOne on the user collection with correct parameters', () => {
        giveAccessToUserPlanningFactory(userCollection)('requester_id', 'requested_id');

        expect(userCollection.update).to.have.been.calledWith('requested_id', {
          $set: {
            coachId: 'requester_id',
          },
        });
      });

      it('should returns the update result', () => {
        const result = giveAccessToUserPlanningFactory(userCollection)('requester_with_access_id', 'requested_id');

        expect(result).to.equal(42);
      });
    });
  });
});
