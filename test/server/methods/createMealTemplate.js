/* global Meteor, beforeEach, describe, it, expect, sinon */
import createMealTemplateFactory from '../../../app/server/methods/createMealTemplate';

describe('server', () => {
  describe('methods', () => {
    const mealTemplateCollection = {
      insert: sinon.stub().returns('meal_template_id'),
    };

    const dishCollection = {
      findByMeal: sinon.stub().returns([]),
      insert: sinon.spy(),
    };

    const mealCollection = {
      findOne: sinon.stub().returns({}),
    };

    beforeEach(() => {
      Meteor.Error.reset();
      mealTemplateCollection.insert.reset();
      dishCollection.insert.reset();
      dishCollection.findByMeal.reset();
      mealCollection.findOne.reset();
    });

    describe('createMealTemplate', () => {
      it('should call MealTemplate collection findOne method with given mealTemplate id', () => {
        createMealTemplateFactory(mealCollection, dishCollection, mealTemplateCollection)('meal_id', new Date());

        expect(mealCollection.findOne).to.have.been.calledWith('meal_id');
      });

      it('should throw a 404 meteor error if MealTemplate cannot be found', () => {
        mealCollection.findOne.returns(null);

        const createMealTemplate = createMealTemplateFactory(mealCollection, dishCollection, mealTemplateCollection);

        expect(createMealTemplate.bind(null, 'meal_id', null)).to.throw(Error);
        expect(Meteor.Error).to.have.been.calledWith(404, 'Meal not found');
      });

      it('should call insert a MealTemplate with the same name as the Meal', () => {
        mealCollection.findOne.returns({
          name: 'foo',
          date: new Date(),
        });

        dishCollection.findByMeal.returns([{_id: 'not expected', mealId: 'not expected', position: 1}]);

        createMealTemplateFactory(mealCollection, dishCollection, mealTemplateCollection)('meal_id', 'bar');

        expect(mealTemplateCollection.insert).to.have.been.calledWith({
          name: 'bar',
        });
      });

      it('should call insert copies of the Meal dishes, setting their mealTemplateId', () => {
        mealCollection.findOne.returns({});

        dishCollection.findByMeal.returns([{_id: 'not expected', mealId: 'not expected', position: 1}]);

        createMealTemplateFactory(mealCollection, dishCollection, mealTemplateCollection)('meal_id');

        expect(dishCollection.insert).to.have.been.calledWith({
          mealTemplateId: 'meal_template_id',
          position: 1,
        });
      });
    });
  });
});
