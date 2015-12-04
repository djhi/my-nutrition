/* eslint no-unused-expressions: 0 */
/* global Meteor, beforeEach, describe, it, expect, sinon */
import {
  MEAL_TEMPLATES,
  MEAL_TEMPLATES_REMOVE,
  MEAL_TEMPLATES_NEW_FROM_MEAL,
  MEALS_NEW_FROM_MEAL_TEMPLATE,
  loadMealTemplatesFactory,
  deleteMealTemplateFactory,
  newMealTemplate,
  newMealFromTemplate,
} from 'app/client/actions/mealTemplates';

import moment from 'moment';

describe('actions', () => {
  const mealTemplateCollection = {
    find: sinon.stub().returns({ fetch: sinon.stub().returns([]) }),
    findOne: sinon.stub(),
    insert: sinon.stub(),
    remove: sinon.stub(),
  };

  const dispatch = sinon.spy();

  beforeEach(() => {
    mealTemplateCollection.find.reset();
    mealTemplateCollection.findOne.reset();
    mealTemplateCollection.insert.reset();
    mealTemplateCollection.remove.reset();
    dispatch.reset();
    Meteor.subscribe.reset();
  });

  describe('mealTemplates', () => {
    describe('loadMealTemplates', () => {
      it('should return a MEAL_TEMPLATES action', () => {
        loadMealTemplatesFactory(mealTemplateCollection)()(dispatch);

        expect(dispatch).to.have.been.calledWith(sinon.match
          .has('type', MEAL_TEMPLATES).and(
            sinon.match.has('meteor', sinon.match
              .has('subscribe', sinon.match.func)
              .and(sinon.match.has('get', sinon.match.func))
            )
          )
        );
      });

      it('should dispatch a meteor action subscribing to mealTemplates', () => {
        loadMealTemplatesFactory(mealTemplateCollection)()(dispatch);

        const call = dispatch.getCall(0);
        call.args[0].meteor.subscribe();
        expect(Meteor.subscribe).to.have.been.calledWith('mealTemplates');
      });

      it('should dispatch a meteor action gettings meal templates by calling find on the mealTemplate collection', () => {
        loadMealTemplatesFactory(mealTemplateCollection)()(dispatch);

        const call = dispatch.getCall(0);
        call.args[0].meteor.get();
        expect(mealTemplateCollection.find).to.have.been.called;
      });
    });

    describe('deleteMealTemplate', () => {
      it('should dispatch a MEAL_TEMPLATES_REMOVE meteor action with correct parameters', () => {
        deleteMealTemplateFactory(mealTemplateCollection)(14)(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: MEAL_TEMPLATES_REMOVE,
          meteor: {
            remove: {
              id: 14,
              collection: mealTemplateCollection,
            },
          },
        });
      });
    });

    describe('newMealTemplate', () => {
      it('should dispatch a MEAL_TEMPLATES_NEW_FROM_MEAL meteor action with correct parameters', () => {
        newMealTemplate('fake_id', 'foo')(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: MEAL_TEMPLATES_NEW_FROM_MEAL,
          meteor: {
            call: {
              method: 'createMealTemplate',
              parameters: [
                'fake_id',
                'foo',
              ],
            },
          },
        });
      });
    });

    describe('newMealFromTemplate', () => {
      it('should call meteor method createMealFromTemplate with given meal template id and date', () => {
        const date = new Date();

        newMealFromTemplate('fake_id', date)(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: MEALS_NEW_FROM_MEAL_TEMPLATE,
          meteor: {
            call: {
              method: 'createMealFromTemplate',
              parameters: [
                'fake_id',
                moment(date).utc().toDate(),
              ],
            },
          },
        });
      });
    });
  });
});
