/* global beforeEach, describe, it, expect, sinon */
import incrementDishesPositionFactory from 'app/server/methods/meals/incrementDishesPosition';

describe('server', () => {
  describe('methods', () => {
    describe('incrementDishesPosition', () => {
      const mealDishCollection = {
        direct: {
          update: sinon.spy(),
        },
      };

      it('should call MealDish collection update method to increment all dishes with a position greater or equal to given position from targetted meal with given value', () => {
        incrementDishesPositionFactory(mealDishCollection)('meal_id', 99, 14);

        expect(mealDishCollection.direct.update).to.have.been.calledWith({
          mealId: 'meal_id',
          position: {
            $gte: 99,
          },
        }, {
          $inc: {
            position: 14,
          },
        }, {
          multi: true,
        });
      });

      it('should call MealDish collection update method to increment all dishes with a position greater or equal to given position from targetted meal with default value', () => {
        incrementDishesPositionFactory(mealDishCollection)('meal_id', 99);

        expect(mealDishCollection.direct.update).to.have.been.calledWith({
          mealId: 'meal_id',
          position: {
            $gte: 99,
          },
        }, {
          $inc: {
            position: 1,
          },
        }, {
          multi: true,
        });
      });
    });
  });
});
