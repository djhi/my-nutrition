/* eslint no-unused-expressions: 0 */
/* global Meteor, beforeEach, describe, it, expect, sinon */
import {
  loadMealTypeDefaultsFactory,
}
from '../../../app/client/actions/mealTypeDefaults';

describe('actions', () => {
  const mealTypeDefaultCollection = {
    find: sinon.stub().returns({ fetch: sinon.stub() }),
    findOne: sinon.stub(),
    insert: sinon.stub(),
    remove: sinon.stub(),
    update: sinon.stub(),
  };

  const dispatch = sinon.spy();

  beforeEach(() => {
    mealTypeDefaultCollection.find.reset();
    mealTypeDefaultCollection.findOne.reset();
    mealTypeDefaultCollection.insert.reset();
    mealTypeDefaultCollection.remove.reset();
    mealTypeDefaultCollection.update.reset();
    dispatch.reset();
    Meteor.subscribe.reset();
  });

  describe('mealTypeDefaults', () => {
    describe('loadMealTypeDefaults', () => {
      it('should return a MEAL_TYPE_DEFAULTS action', () => {
        loadMealTypeDefaultsFactory(mealTypeDefaultCollection)()(dispatch);

        expect(dispatch).to.have.been.calledWith(sinon.match
          .has('type', 'MEAL_TYPE_DEFAULTS').and(
            sinon.match.has('meteor', sinon.match
              .has('subscribe', sinon.match.func)
              .and(sinon.match.has('get', sinon.match.func))
            )
          )
        );
      });

      it('should dispatch a meteor action subscribing to mealTypeDefaults', () => {
        loadMealTypeDefaultsFactory(mealTypeDefaultCollection)()(dispatch);

        const call = dispatch.getCall(0);
        call.args[0].meteor.subscribe();
        expect(Meteor.subscribe).to.have.been.calledWith('mealTypeDefaults');
      });

      it('should dispatch a meteor action gettings meals by calling find on the mealTypeDefault collection', () => {
        loadMealTypeDefaultsFactory(mealTypeDefaultCollection)()(dispatch);

        const call = dispatch.getCall(0);
        call.args[0].meteor.get();
        expect(mealTypeDefaultCollection.find).to.have.been.called;
      });
    });
  });
});
