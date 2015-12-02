/* eslint no-unused-expressions: 0 */
/* global Meteor, beforeEach, describe, it, expect, sinon */
import {
  DISHES_REMOVE,
  DISHES_COPY,
  DISHES_MOVE,
  DISHES_INSERT,
  DISHES_UPDATE,
  copyDishToMeal,
  deleteMealDishFactory,
  moveDishToMeal,
  newMealDishFactory,
  updateMealDishFactory,
} from 'app/client/actions/dishes';

describe('actions', () => {
  const insert = sinon.stub();
  insert.withArgs({
    name: 'foo',
    date: sinon.match.date,
  }).callsArgWith(1, undefined, 7).returns();

  const dishCollection = {
    find: sinon.stub(),
    findByMeal: sinon.stub(),
    findOne: sinon.stub(),
    insert: sinon.stub(),
    remove: sinon.stub(),
    update: sinon.stub(),
  };

  const dispatch = sinon.spy();

  beforeEach(() => {
    dishCollection.find.reset();
    dishCollection.findByMeal.reset();
    dishCollection.findOne.reset();
    dishCollection.insert.reset();
    dishCollection.remove.reset();
    dishCollection.update.reset();
    dispatch.reset();
    Meteor.call.reset();
    Meteor.subscribe.reset();
  });

  describe('mealDishes', () => {
    describe('deleteMealDish', () => {
      it('should dispatch a DISHES_REMOVE meteor action with correct parameters', () => {
        deleteMealDishFactory(dishCollection)(14)(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: DISHES_REMOVE,
          meteor: {
            remove: {
              id: 14,
              collection: dishCollection,
            },
          },
        });
      });
    });

    describe('copyDishToMeal', () => {
      it('should dispatch a DISHES_COPY meteor action with correct parameters', () => {
        copyDishToMeal('dish_id', 'meal_id', 14)(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: DISHES_COPY,
          meteor: {
            call: {
              method: 'copyDishToMeal',
              parameters: [
                'dish_id',
                'meal_id',
                14,
              ],
            },
          },
        });
      });
    });

    describe('moveDishToMeal', () => {
      it('should dispatch a DISHES_MOVE meteor action with correct parameters', () => {
        moveDishToMeal('dish_id', 'meal_id', 14)(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: DISHES_MOVE,
          meteor: {
            call: {
              method: 'moveDishToMeal',
              parameters: [
                'dish_id',
                'meal_id',
                14,
              ],
            },
          },
        });
      });
    });

    describe('newMealDish', () => {
      it('should dispatch a DISHES_INSERT meteor action with correct parameters', () => {
        const dish = {
          foo: 'bar',
        };
        newMealDishFactory(dishCollection)('fake_id', dish)(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: DISHES_INSERT,
          meteor: {
            insert: {
              entity: {
                foo: 'bar',
                mealId: 'fake_id',
              },
              collection: dishCollection,
            },
          },
        });
      });
    });

    describe('updateMealDish', () => {
      it('should dispatch a DISHES_UPDATE meteor action with correct parameters', () => {
        const dish = {
          _id: 'fake_id',
          foo: 'bar',
        };
        updateMealDishFactory(dishCollection)(dish)(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: DISHES_UPDATE,
          meteor: {
            update: {
              id: 'fake_id',
              modifiers: {
                $set: {
                  foo: 'bar',
                },
              },
              collection: dishCollection,
            },
          },
        });
      });
    });
  });
});
