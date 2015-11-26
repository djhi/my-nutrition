/* eslint no-unused-expressions: 0 */
/* global beforeEach, describe, it, expect, sinon */
import addUserOnInsert from 'app/collections/common/addUserOnInsert';

describe('collections', () => {
  describe('common', () => {
    describe('addUserOnInsert', () => {
      it('should return the user id when operation is an insertion', () => {
        const result = addUserOnInsert({ isInsert: true, userId: 'user_id'});

        expect(result).to.equal('user_id');
      });

      it('should call operation.unset when operation is an update', () => {
        const operation = { isUpdate: true, userId: 'user_id', unset: sinon.spy() };
        const result = addUserOnInsert(operation);

        expect(result).to.be.undefined;
        expect(operation.unset).to.have.been.called;
      });
    });
  });
});
