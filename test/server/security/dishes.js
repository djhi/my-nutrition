/* eslint no-unused-expressions: 0 */
/* global beforeEach, describe, it, expect, sinon */
import registerDishSecurity from 'app/server/security/dishes';

describe('server', () => {
  describe('security', () => {
    describe('dishes', () => {
      const dishCollection = {
        allow: sinon.stub(),
      };

      beforeEach(() => {
        dishCollection.allow.reset();
      });

      it('should call dish collection allow method with correct parameters', () => {
        registerDishSecurity(dishCollection);

        expect(dishCollection.allow).to.have.been.calledWith({
          insert: sinon.match.func,
          update: sinon.match.func,
          remove: sinon.match.func,
        });
      });

      describe('on insert', () => {
        it('should return true if user is the dish owner', () => {
          registerDishSecurity(dishCollection);
          const security = dishCollection.allow.getCall(0).args[0];
          const result = security.insert('user_id', { userId: 'user_id' });

          expect(result).to.be.true;
        });

        it('should return false if user is not the dish owner', () => {
          registerDishSecurity(dishCollection);
          const security = dishCollection.allow.getCall(0).args[0];
          const result = security.insert('user_id', { userId: 'user_id2' });

          expect(result).to.be.false;
        });
      });

      describe('on update', () => {
        it('should return true if user is the dish owner', () => {
          registerDishSecurity(dishCollection);
          const security = dishCollection.allow.getCall(0).args[0];
          const result = security.update('user_id', { userId: 'user_id' }, ['foo']);

          expect(result).to.be.true;
        });

        it('should return false if user is not the dish owner', () => {
          registerDishSecurity(dishCollection);
          const security = dishCollection.allow.getCall(0).args[0];
          const result = security.update('user_id', { userId: 'user_id2' }, ['foo']);

          expect(result).to.be.false;
        });

        it('should return false if the userId field is modified', () => {
          registerDishSecurity(dishCollection);
          const security = dishCollection.allow.getCall(0).args[0];
          const result = security.update('user_id', { userId: 'user_id' }, ['userId', 'foo']);

          expect(result).to.be.false;
        });
      });

      describe('on remove', () => {
        it('should return true if user is the dish owner', () => {
          registerDishSecurity(dishCollection);
          const security = dishCollection.allow.getCall(0).args[0];
          const result = security.remove('user_id', { userId: 'user_id' });

          expect(result).to.be.true;
        });

        it('should return false if user is not the dish owner', () => {
          registerDishSecurity(dishCollection);
          const security = dishCollection.allow.getCall(0).args[0];
          const result = security.remove('user_id', { userId: 'user_id2' });

          expect(result).to.be.false;
        });
      });
    });
  });
});
