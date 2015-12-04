/* eslint no-unused-expressions: 0 */
/* global Meteor, beforeEach, describe, it, expect, sinon */
import moment from 'moment';

import {
  MEALS,
  MEALS_REMOVE,
  MEALS_INSERT,
  MEALS_UPDATE,
  loadMealsFactory,
  deleteMealFactory,
  newMealFactory,
  updateMealTimeFactory,
}
from 'app/client/actions/meals';

describe('actions', () => {
  const mealCollection = {
    find: sinon.stub().returns({ fetch: sinon.stub() }),
    findByUserAndDate: sinon.stub().returns({ fetch: sinon.stub() }),
    findOne: sinon.stub(),
    insert: sinon.stub(),
    remove: sinon.stub(),
    update: sinon.stub(),
  };

  const dispatch = sinon.spy();

  beforeEach(() => {
    mealCollection.find.reset();
    mealCollection.findByUserAndDate.reset();
    mealCollection.findOne.reset();
    mealCollection.insert.reset();
    mealCollection.remove.reset();
    mealCollection.update.reset();
    dispatch.reset();
    Meteor.subscribe.reset();
  });

  describe('meals', () => {
    describe('loadMeals', () => {
      it('should return a MEALS action', () => {
        loadMealsFactory(mealCollection)()(dispatch);

        expect(dispatch).to.have.been.calledWith(sinon.match
          .has('type', MEALS).and(
            sinon.match.has('meteor', sinon.match
              .has('subscribe', sinon.match.func)
              .and(sinon.match.has('get', sinon.match.func))
            )
          )
        );
      });

      it('should dispatch a meteor action subscribing to meals', () => {
        const date = new Date();
        loadMealsFactory(mealCollection)(date)(dispatch);

        const call = dispatch.getCall(0);
        call.args[0].meteor.subscribe();
        expect(Meteor.subscribe).to.have.been.calledWith('meals');
      });

      it('should dispatch a meteor action gettings meals by calling findByUserAndDate on the meal collection', () => {
        const date = new Date();
        loadMealsFactory(mealCollection)(date)(dispatch);

        const call = dispatch.getCall(0);
        call.args[0].meteor.get();
        expect(mealCollection.findByUserAndDate).to.have.been.calledWith(date);
      });
    });

    describe('deleteMeal', () => {
      it('should dispatch a MEALS_REMOVE meteor action with correct parameters', () => {
        deleteMealFactory(mealCollection)(14)(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: MEALS_REMOVE,
          meteor: {
            remove: {
              id: 14,
              collection: mealCollection,
            },
          },
        });
      });
    });

    describe('newMeal', () => {
      it('should dispatch a MEALS_INSERT meteor action with correct parameters', () => {
        const date = new Date();
        newMealFactory(mealCollection)('foo', 'bar', date)(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: MEALS_INSERT,
          meteor: {
            insert: {
              entity: {
                type: 'foo',
                name: 'bar',
                date: moment(date).utc().toDate(),
              },
              collection: mealCollection,
            },
          },
        });
      });

      describe('updateMealTime', () => {
        it('should dispatch a MEALS_UPDATE meteor action with correct parameters', () => {
          const date = new Date();
          updateMealTimeFactory(mealCollection)('meal_id', date)(dispatch);

          expect(dispatch).to.have.been.calledWith({
            type: MEALS_UPDATE,
            meteor: {
              update: {
                id: 'meal_id',
                modifiers: {
                  $set: {
                    date: moment(date).utc().toDate(),
                  },
                },
                collection: mealCollection,
              },
            },
          });
        });
      });
    });
  });
});
