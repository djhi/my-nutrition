/* global beforeEach, describe, it, expect, sinon */
import findByMealFactory from 'app/collections/dishes/findByMeal';

describe('collections', () => {
  describe('dishes', () => {
    describe('findByMeal', () => {
      it('should call find on the MealDishes collection with filter on mealId', () => {
        const mealDishCollection = {
          find: sinon.spy(),
        };

        findByMealFactory(mealDishCollection)('fake_id');

        expect(mealDishCollection.find).to.have.been.calledWith({
          mealId: 'fake_id',
        });
      });
    });
  });
});
