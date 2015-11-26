/* eslint no-unused-expressions: 0 */
/* global beforeEach, describe, it, expect, sinon */
import checkUserHasAccessToUserPlanningFactory from 'app/server/methods/user/checkUserHasAccessToUserPlanning';

describe('server', () => {
  describe('methods', () => {
    describe('checkUserHasAccessToUserPlanning', () => {
      const userCollection = {
        findOne: sinon.stub(),
      };

      userCollection.findOne.withArgs({
        _id: 'requested_id',
        coachId: 'requester_with_access_id',
      }).returns({ foo: 'bar' });

      userCollection.findOne.withArgs({
        _id: 'requested_id',
        coachId: 'requester_without_access_id',
      }).returns(null);

      beforeEach(() => {
        userCollection.findOne.reset();
      });

      it('should call findOne on the user collection with correct parameters', () => {
        checkUserHasAccessToUserPlanningFactory(userCollection)('requester_id', 'requested_id');

        expect(userCollection.findOne).to.have.been.calledWith({
          _id: 'requested_id',
          coachId: 'requester_id',
        });
      });

      it('should returns true if requesting user has access to requested user', () => {
        const result = checkUserHasAccessToUserPlanningFactory(userCollection)('requester_with_access_id', 'requested_id');

        expect(result).to.be.true;
      });

      it('should returns false if requesting user hasn\'t access to requested user', () => {
        const result = checkUserHasAccessToUserPlanningFactory(userCollection)('requester_without_access_id', 'requested_id');

        expect(result).to.be.false;
      });
    });
  });
});
