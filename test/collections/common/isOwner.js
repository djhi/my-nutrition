/* eslint no-unused-expressions: 0 */
/* global beforeEach, describe, it, expect, sinon */
import isOwner from 'app/collections/common/isOwner';

describe('collections', () => {
  describe('common', () => {
    describe('isOwner', () => {
      it('should return true if doc.userId is equal to userId', () => {
        const result = isOwner({ userId: 'fake_id'}, 'fake_id');

        expect(result).to.be.true;
      });

      it('should return false if doc.userId is not equal to userId', () => {
        const result = isOwner({ userId: 'fake_id'}, 'fake_id2');

        expect(result).to.be.false;
      });
    });
  });
});
