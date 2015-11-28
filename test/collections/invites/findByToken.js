/* global beforeEach, describe, it, expect, sinon */
import findByTokenFactory from 'app/collections/invites/findByToken';

describe('collections', () => {
  describe('invites', () => {
    describe('findByToken', () => {
      it('should call findOne on the Invite collection with filter on token', () => {
        const collection = {
          findOne: sinon.spy(),
        };

        findByTokenFactory(collection)('super_token');

        expect(collection.findOne).to.have.been.calledWith({
          token: 'super_token',
        });
      });
    });
  });
});
