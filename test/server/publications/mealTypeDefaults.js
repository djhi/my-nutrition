/* global beforeEach, describe, it, expect, sinon */
import registerMealTypeDefaultsPublications from '../../../app/server/publications/mealTypeDefaults';

describe('server', () => {
  describe('publications', () => {
    describe('mealTypeDefaults', () => {
      beforeEach(() => {
        global.Meteor.publish.reset();
      });

      it('should register a meteor publication named mealTypeDefaults', () => {
        registerMealTypeDefaultsPublications();

        expect(global.Meteor.publish).to.have.been.calledWith('mealTypeDefaults', sinon.match.func);
      });

      it('should register a meteor publication which call mealTypeDefaultsCollection.find', () => {
        const mealTypeDefaultsCollection = {
          find: sinon.spy(),
        };

        registerMealTypeDefaultsPublications(mealTypeDefaultsCollection);
        const call = global.Meteor.publish.getCall(0);
        call.args[1].call({ userId: 'user_id'});

        expect(mealTypeDefaultsCollection.find).to.have.been.calledWith({ userId: 'user_id' });
      });
    });
  });
});
