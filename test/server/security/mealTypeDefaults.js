/* eslint no-unused-expressions: 0 */
/* global beforeEach, describe, it, expect, sinon */
import registerMealTypeDefaultSecurity from '../../../app/server/security/mealTypeDefaults';

describe('server', () => {
  describe('security', () => {
    describe('mealTypeDefaultTemplates', () => {
      const mealTypeDefaultCollection = {
        allow: sinon.stub(),
      };

      beforeEach(() => {
        mealTypeDefaultCollection.allow.reset();
      });

      it('should call mealTypeDefault collection allow method with correct parameters', () => {
        registerMealTypeDefaultSecurity(mealTypeDefaultCollection);

        expect(mealTypeDefaultCollection.allow).to.have.been.calledWith({
          insert: sinon.match.func,
          update: sinon.match.func,
          remove: sinon.match.func,
        });
      });

      describe('on insert', () => {
        it('should return true if user is the mealTypeDefault owner', () => {
          registerMealTypeDefaultSecurity(mealTypeDefaultCollection);
          const security = mealTypeDefaultCollection.allow.getCall(0).args[0];
          const result = security.insert('user_id', { userId: 'user_id' });

          expect(result).to.be.true;
        });

        it('should return false if user is not the mealTypeDefault owner', () => {
          registerMealTypeDefaultSecurity(mealTypeDefaultCollection);
          const security = mealTypeDefaultCollection.allow.getCall(0).args[0];
          const result = security.insert('user_id', { userId: 'user_id2' });

          expect(result).to.be.false;
        });
      });

      describe('on update', () => {
        it('should return true if user is the mealTypeDefault owner', () => {
          registerMealTypeDefaultSecurity(mealTypeDefaultCollection);
          const security = mealTypeDefaultCollection.allow.getCall(0).args[0];
          const result = security.update('user_id', { userId: 'user_id' }, ['foo']);

          expect(result).to.be.true;
        });

        it('should return false if user is not the mealTypeDefault owner', () => {
          registerMealTypeDefaultSecurity(mealTypeDefaultCollection);
          const security = mealTypeDefaultCollection.allow.getCall(0).args[0];
          const result = security.update('user_id', { userId: 'user_id2' }, ['foo']);

          expect(result).to.be.false;
        });

        it('should return false if the userId field is modified', () => {
          registerMealTypeDefaultSecurity(mealTypeDefaultCollection);
          const security = mealTypeDefaultCollection.allow.getCall(0).args[0];
          const result = security.update('user_id', { userId: 'user_id' }, ['userId', 'foo']);

          expect(result).to.be.false;
        });
      });

      describe('on remove', () => {
        it('should return true if user is the mealTypeDefault owner', () => {
          registerMealTypeDefaultSecurity(mealTypeDefaultCollection);
          const security = mealTypeDefaultCollection.allow.getCall(0).args[0];
          const result = security.remove('user_id', { userId: 'user_id' });

          expect(result).to.be.true;
        });

        it('should return false if user is not the mealTypeDefault owner', () => {
          registerMealTypeDefaultSecurity(mealTypeDefaultCollection);
          const security = mealTypeDefaultCollection.allow.getCall(0).args[0];
          const result = security.remove('user_id', { userId: 'user_id2' });

          expect(result).to.be.false;
        });
      });
    });
  });
});
