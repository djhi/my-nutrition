/* global Meteor, beforeEach, describe, it, expect, sinon */
import createMealFromTemplateFactory from 'app/server/methods/meals/createMealFromTemplate';

describe('server', () => {
  describe('methods', () => {
    const mealCollection = {
      insert: sinon.stub().returns('meal_id'),
    };

    const dishCollection = {
      findByMealTemplate: sinon.stub().returns([]),
      insert: sinon.spy(),
    };

    const mealTemplateCollection = {
      findOne: sinon.stub().returns({}),
    };

    beforeEach(() => {
      Meteor.Error.reset();
      mealCollection.insert.reset();
      dishCollection.insert.reset();
      dishCollection.findByMealTemplate.reset();
      mealTemplateCollection.findOne.reset();
    });

    describe('createMealFromTemplate', () => {
      it('should call MealTemplate collection findOne method with given mealTemplate id', () => {
        createMealFromTemplateFactory(mealCollection, dishCollection, mealTemplateCollection)('meal_template_id', new Date());

        expect(mealTemplateCollection.findOne).to.have.been.calledWith('meal_template_id');
      });

      it('should throw a 404 meteor error if MealTemplate cannot be found', () => {
        mealTemplateCollection.findOne.returns(null);

        const createMealFromTemplate = createMealFromTemplateFactory(mealCollection, dishCollection, mealTemplateCollection);

        expect(createMealFromTemplate.bind(null, 'meal_template_id', null)).to.throw(Error);
        expect(Meteor.Error).to.have.been.calledWith(404, 'MealTemplate not found');
      });

      it('should call insert a Meal with the same name as the MealTemplate and the specified date', () => {
        const date = new Date();

        mealTemplateCollection.findOne.returns({
          name: 'foo',
        });

        createMealFromTemplateFactory(mealCollection, dishCollection, mealTemplateCollection)('meal_id', date);

        expect(mealCollection.insert).to.have.been.calledWith({
          name: 'foo',
          date,
        });
      });

      it('should call insert copies of the MealTemplate dishes, setting their mealId', () => {
        mealTemplateCollection.findOne.returns({});

        dishCollection.findByMealTemplate.returns([{_id: 'not expected', mealTemplateId: 'not expected', position: 1}])

        createMealFromTemplateFactory(mealCollection, dishCollection, mealTemplateCollection)('meal_template_id');

        expect(dishCollection.insert).to.have.been.calledWith({
          mealId: 'meal_id',
          position: 1,
        });
      });
    });
  });
});
