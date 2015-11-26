/* global beforeEach, describe, it, expect, sinon */
import findByMealTemplateFactory from 'app/collections/dishes/findByMealTemplate';

describe('collections', () => {
  describe('dishes', () => {
    describe('findByMealTemplate', () => {
      it('should call find on the MealDishes collection with filter on mealId', () => {
        const mealDishCollection = {
          find: sinon.spy(),
        };

        findByMealTemplateFactory(mealDishCollection)('fake_id');

        expect(mealDishCollection.find).to.have.been.calledWith({
          mealTemplateId: 'fake_id',
        });
      });
    });
  });
});
