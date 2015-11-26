/* global Meteor, beforeEach, describe, it, expect, sinon */
import updateMealDishesFactory from 'app/server/methods/meals/updateMealDishes';

describe('server', () => {
  describe('methods', () => {
    const dishCollection = {
      findByMeal: sinon.stub().returns({
        fetch: () => [{foo: 'bar'}],
      }),
    };

    const mealCollection = {
      update: sinon.stub().returns(42),
    };

    beforeEach(() => {
      dishCollection.findByMeal.reset();
      mealCollection.update.reset();
    });

    describe('updateMealDishes', () => {
      it('should call dish collection findByMeal method with given meal id', () => {
        updateMealDishesFactory(dishCollection, mealCollection)('meal_id', new Date());

        expect(dishCollection.findByMeal).to.have.been.calledWith('meal_id');
      });

      it('should call meal collection update method with correct parameters', () => {
        updateMealDishesFactory(dishCollection, mealCollection)('meal_id');

        expect(mealCollection.update).to.have.been.calledWith('meal_id', {
          $set: {
            dishes: [{foo: 'bar'}],
          },
        });
      });
    });
  });
});
