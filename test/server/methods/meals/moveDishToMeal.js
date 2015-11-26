/* global Meteor, beforeEach, describe, it, expect, sinon */
import moveDishToMealFactory from 'app/server/methods/meals/moveDishToMeal';

describe('server', () => {
  describe('methods', () => {
    describe('moveDishToMeal', () => {
      const findOne = sinon.stub();

      findOne.withArgs('dish_id').returns({
        _id: 'shouldnt be copied',
        foo: 'bar',
        mealId: 'source_meal_id',
        position: 99,
      });
      findOne.withArgs('invalid_dish_id').returns(null);

      const mealDishCollection = {
        findOne,
        direct: {
          update: sinon.spy(),
        },
      };

      const incrementDishesPosition = sinon.spy();
      const updateMealDishes = sinon.spy();

      beforeEach(() => {
        mealDishCollection.findOne.reset();
        mealDishCollection.direct.update.reset();
        incrementDishesPosition.reset();
        updateMealDishes.reset();
        Meteor.Error.reset();
      });

      it('should call MealDish collection findOne method with given dish id', () => {
        moveDishToMealFactory(mealDishCollection, incrementDishesPosition, updateMealDishes)('dish_id', 'meal_id', 14);

        expect(mealDishCollection.findOne).to.have.been.calledWith('dish_id');
      });

      it('should throw a 404 meteor error if dish cannot be found', () => {
        const moveDishToMeal = moveDishToMealFactory(mealDishCollection, incrementDishesPosition, updateMealDishes);

        expect(moveDishToMeal.bind(null, 'invalid_dish_id', 'meal_id', 14)).to.throw(Error);
        expect(Meteor.Error).to.have.been.calledWith(404, 'Dish not found');
      });

      it('should call incrementDishesPosition with target meal id and source dish position', () => {
        moveDishToMealFactory(mealDishCollection, incrementDishesPosition, updateMealDishes)('dish_id', 'meal_id', 14);

        expect(incrementDishesPosition.getCall(0)).to.have.been.calledWith('meal_id', 14);
      });

      it('should call incrementDishesPosition with source dish meal id and position + 1', () => {
        moveDishToMealFactory(mealDishCollection, incrementDishesPosition, updateMealDishes)('dish_id', 'meal_id', 14, -1);

        expect(incrementDishesPosition.getCall(1)).to.have.been.calledWith('source_meal_id', 100, -1);
      });

      it('should call MealDish collection update method with the dish id, setting the targetted meal id and the position', () => {
        moveDishToMealFactory(mealDishCollection, incrementDishesPosition, updateMealDishes)('dish_id', 'meal_id', 14);

        expect(mealDishCollection.direct.update).to.have.been.calledWith('dish_id', {
          $set: {
            mealId: 'meal_id',
            position: 14,
          },
        });
      });
    });
  });
});
