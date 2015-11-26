/* eslint no-unused-expressions: 0 */
/* global beforeEach, describe, it, expect, sinon */
import registerMealSecurity from 'app/server/security/meals';

describe('server', () => {
  describe('security', () => {
    describe('meals', () => {
      const mealCollection = {
        allow: sinon.stub(),
      };

      beforeEach(() => {
        mealCollection.allow.reset();
      });

      it('should call meal collection allow method with correct parameters', () => {
        registerMealSecurity(mealCollection);

        expect(mealCollection.allow).to.have.been.calledWith({
          insert: sinon.match.func,
          update: sinon.match.func,
          remove: sinon.match.func,
        });
      });

      describe('on insert', () => {
        it('should return true if user is the meal owner', () => {
          registerMealSecurity(mealCollection);
          const security = mealCollection.allow.getCall(0).args[0];
          const result = security.insert('user_id', { userId: 'user_id' });

          expect(result).to.be.true;
        });

        it('should return false if user is not the meal owner', () => {
          registerMealSecurity(mealCollection);
          const security = mealCollection.allow.getCall(0).args[0];
          const result = security.insert('user_id', { userId: 'user_id2' });

          expect(result).to.be.false;
        });
      });

      describe('on update', () => {
        it('should return true if user is the meal owner', () => {
          registerMealSecurity(mealCollection);
          const security = mealCollection.allow.getCall(0).args[0];
          const result = security.update('user_id', { userId: 'user_id' }, ['foo']);

          expect(result).to.be.true;
        });

        it('should return false if user is not the meal owner', () => {
          registerMealSecurity(mealCollection);
          const security = mealCollection.allow.getCall(0).args[0];
          const result = security.update('user_id', { userId: 'user_id2' }, ['foo']);

          expect(result).to.be.false;
        });

        it('should return false if the userId field is modified', () => {
          registerMealSecurity(mealCollection);
          const security = mealCollection.allow.getCall(0).args[0];
          const result = security.update('user_id', { userId: 'user_id' }, ['userId', 'foo']);

          expect(result).to.be.false;
        });
      });

      describe('on remove', () => {
        it('should return true if user is the meal owner', () => {
          registerMealSecurity(mealCollection);
          const security = mealCollection.allow.getCall(0).args[0];
          const result = security.remove('user_id', { userId: 'user_id' });

          expect(result).to.be.true;
        });

        it('should return false if user is not the meal owner', () => {
          registerMealSecurity(mealCollection);
          const security = mealCollection.allow.getCall(0).args[0];
          const result = security.remove('user_id', { userId: 'user_id2' });

          expect(result).to.be.false;
        });
      });
    });
  });
});
