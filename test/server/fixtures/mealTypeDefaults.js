/* eslint no-unused-expressions: 0 */
/* global Accounts, beforeEach, describe, it, expect, sinon */
import lodash from 'lodash';
import registerMealTypeDefaults, { DefaultMealTypes } from '../../../app/server/fixtures/mealTypeDefaults';

describe('server', () => {
  describe('fixtures', () => {
    describe('registerMealTypeDefaults', () => {
      const forEach = sinon.stub().yields({
        _id: 'user_id',
      }, {
        _id: 'user_who_have_defaults_already',
      });

      const userCollection = {
        find: sinon.stub().returns({
          forEach,
        }),
      };

      beforeEach(() => {
        forEach.reset();
        userCollection.find.reset();
      });

      it('should get the count of the currently registered mealTypeDefaults', () => {
        const count = sinon.stub();
        const mealTypeDefaultCollection = {
          find: sinon.stub().returns({
            count,
          }),
        };
        registerMealTypeDefaults(mealTypeDefaultCollection, userCollection);

        expect(count).to.have.been.called;
      });

      it('should insert all mealTypeDefaults defined in DefaultMealTypes', () => {
        const count = sinon.stub().returns(0);

        const mealTypeDefaultCollection = {
          find: sinon.stub().returns({
            count,
          }),
          insert: sinon.stub(),
        };
        registerMealTypeDefaults(mealTypeDefaultCollection, userCollection);

        DefaultMealTypes.forEach(dmt => {
          expect(mealTypeDefaultCollection.insert).to.have.been.calledWith(dmt);
        });
      });

      it('should insert all mealTypeDefaults for all users who don\'t have defaults yet', () => {
        const count = sinon.stub();
        count.onFirstCall().returns(1); // Bypass system defaults
        count.onSecondCall().returns(0); // 1st user don't have defaults
        count.onThirdCall().returns(1); // 2nd user have defaults already

        const mealTypeDefaultCollection = {
          find: sinon.stub().returns({
            count,
          }),
          insert: sinon.stub(),
        };
        registerMealTypeDefaults(mealTypeDefaultCollection, userCollection);

        DefaultMealTypes.forEach(dmt => {
          expect(mealTypeDefaultCollection.insert).to.have.been.calledWith(lodash.assign({ userId: 'user_id' }, dmt));
        });
      });
    });
  });
});
