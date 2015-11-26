/* eslint no-unused-expressions: 0 */
/* global Accounts, beforeEach, describe, it, expect, sinon */
import lodash from 'lodash';
import registerDefaultsMealTemplates, { DefaultMealTemplates } from 'app/server/fixtures/registerDefaultsMealTemplates';

describe('server', () => {
  describe('fixtures', () => {
    describe('registerDefaultsMealTemplates', () => {
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


      it('should get the count of the currently registered default meal templates', () => {
        const count = sinon.stub();
        const mealTemplateCollection = {
          find: sinon.stub().returns({
            count,
          }),
        };

        registerDefaultsMealTemplates(mealTemplateCollection, userCollection);

        expect(count).to.have.been.called;
      });

      it('should insert all default meal templates defined in DefaultMealTemplates', () => {
        const count = sinon.stub().returns(0);

        const mealTemplateCollection = {
          find: sinon.stub().returns({
            count,
          }),
          insert: sinon.stub(),
        };
        registerDefaultsMealTemplates(mealTemplateCollection, userCollection);

        DefaultMealTemplates.forEach(dmt => {
          expect(mealTemplateCollection.insert).to.have.been.calledWith(dmt);
        });
      });

      it('should insert all default meal templates for all users who don\'t have defaults yet', () => {
        const count = sinon.stub();
        count.onFirstCall().returns(1); // Bypass system defaults
        count.onSecondCall().returns(0); // 1st user don't have defaults
        count.onThirdCall().returns(1); // 2nd user have defaults already

        const mealTemplateCollection = {
          find: sinon.stub().returns({
            count,
          }),
          insert: sinon.stub(),
        };
        registerDefaultsMealTemplates(mealTemplateCollection, userCollection);

        DefaultMealTemplates.forEach(dmt => {
          expect(mealTemplateCollection.insert).to.have.been.calledWith(lodash.assign({ userId: 'user_id' }, dmt));
        });
      });
    });
  });
});
