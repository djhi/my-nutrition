/* global beforeEach, describe, it, expect, sinon */
import registerMealTemplatePublications from 'app/server/publications/mealTemplates';

describe('server', () => {
  describe('publications', () => {
    describe('mealTemplates', () => {
      beforeEach(() => {
        global.Meteor.publish.reset();
      });

      it('should register a meteor publication named mealTemplates', () => {
        registerMealTemplatePublications();

        expect(global.Meteor.publish).to.have.been.calledWith('mealTemplates', sinon.match.func);
      });

      it('should register a meteor publication which call mealTemplateCollection.find', () => {
        const mealTemplateCollection = {
          find: sinon.spy(),
        };

        registerMealTemplatePublications(mealTemplateCollection);
        const call = global.Meteor.publish.getCall(0);
        call.args[1].call({ userId: 'user_id'});

        expect(mealTemplateCollection.find).to.have.been.calledWith({ userId: 'user_id' });
      });
    });
  });
});
