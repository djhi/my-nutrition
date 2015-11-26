/* global Meteor, beforeEach, describe, it, expect, sinon */
import copyDishToMealFactory from 'app/server/methods/meals/copyDishToMeal';

describe('server', () => {
  describe('methods', () => {
    beforeEach(() => {
      Meteor.Error.reset();
    });

    describe('copyDishToMeal', () => {
      const findOne = sinon.stub();

      findOne.withArgs('dish_id').returns({
        _id: 'shouldnt be copied',
        foo: 'bar',
        mealId: 99,
        position: 99,
      });
      findOne.withArgs('invalid_dish_id').returns(null);

      const mealDishCollection = {
        findOne,
        direct: {
          insert: sinon.spy(),
        },
      };

      const incrementDishesPosition = sinon.spy();
      const updateMealDishes = sinon.spy();

      beforeEach(() => {
        mealDishCollection.findOne.reset();
        mealDishCollection.direct.insert.reset();
        incrementDishesPosition.reset();
        updateMealDishes.reset();
      });

      it('should call MealDish collection findOne method with given dish id', () => {
        copyDishToMealFactory(mealDishCollection, incrementDishesPosition, updateMealDishes)('dish_id', 'meal_id', 14);

        expect(mealDishCollection.findOne).to.have.been.calledWith('dish_id');
      });

      it('should throw a 404 meteor error if dish cannot be found', () => {
        const copyDishToMeal = copyDishToMealFactory(mealDishCollection, incrementDishesPosition, updateMealDishes);

        expect(copyDishToMeal.bind(null, 'invalid_dish_id', 'meal_id', 14)).to.throw(Error);
        expect(Meteor.Error).to.have.been.calledWith(404, 'Dish not found');
      });

      it('should call incrementDishesPosition with target meal id and source dish position', () => {
        copyDishToMealFactory(mealDishCollection, incrementDishesPosition, updateMealDishes)('dish_id', 'meal_id', 14);

        expect(incrementDishesPosition).to.have.been.calledWith('meal_id', 14);
      });

      it('should call MealDish collection insert method with a copy of the source dish without its id, adding the targetted meal id and the position', () => {
        copyDishToMealFactory(mealDishCollection, incrementDishesPosition, updateMealDishes)('dish_id', 'meal_id', 14);

        expect(mealDishCollection.direct.insert).to.have.been.calledWith({
          foo: 'bar',
          mealId: 'meal_id',
          position: 14,
        });
      });
    });
  });
});
