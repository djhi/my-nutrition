/* global beforeEach, describe, it, expect, sinon */
import getUserDataFactory from 'app/server/methods/user/getUserData';

describe('server', () => {
  describe('methods', () => {
    describe('getUserData', () => {
      it('should call find on the user collection for specified user', () => {
        const userCollection = {
          find: sinon.spy(),
        };

        getUserDataFactory(userCollection)('fake_id');

        expect(userCollection.find).to.have.been.calledWith({
          _id: 'fake_id',
        }, {
          fields: {
            coachId: 1,
            profile: 1,
            registered_emails: 1,
          },
        });
      });
    });
  });
});
