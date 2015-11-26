/* global Meteor, beforeEach, describe, it, expect, sinon */
import createMealTemplateFactory from 'app/server/methods/meals/createMealTemplate';

describe('server', () => {
  describe('methods', () => {
    const date = new Date();
    const userId = 'userId';

    const mealTemplatefindOne = sinon.stub();
    mealTemplatefindOne.withArgs({
      name: 'find_me',
      userId,
    }).returns({
      _id: 'find_me',
    });

    mealTemplatefindOne.withArgs({
      name: 'invalid',
      userId: sinon.match.string,
    }).returns(null);

    const mealTemplateCollection = {
      insert: sinon.stub().returns('meal_template_id'),
      update: sinon.stub(),
      findOne: mealTemplatefindOne,
    };

    const dishCollection = {
      findByMeal: sinon.stub().returns([{
        _id: 'not expected',
        mealId: 'not expected',
        position: 1,
      }]),
      insert: sinon.spy(),
    };

    const mealfindOne = sinon.stub();
    mealfindOne.withArgs('find_me').returns({
      _id: 'find_me',
      date,
      userId,
    });

    mealfindOne.withArgs('invalid').returns(null);

    const mealCollection = {
      findOne: mealfindOne,
    };

    beforeEach(() => {
      Meteor.Error.reset();
      mealTemplateCollection.insert.reset();
      mealTemplateCollection.update.reset();
      dishCollection.insert.reset();
      dishCollection.findByMeal.reset();
      mealCollection.findOne.reset();
    });

    describe('createMealTemplate', () => {
      const createMealTemplate = createMealTemplateFactory(mealCollection, dishCollection, mealTemplateCollection);

      it('should call Meal collection findOne method with given meal id', () => {
        createMealTemplate('find_me', 'foo');

        expect(mealCollection.findOne).to.have.been.calledWith('find_me');
      });

      it('should throw a 404 meteor error if Meal cannot be found', () => {
        expect(createMealTemplate.bind(null, 'invalid', 'foo')).to.throw(Error);
        expect(Meteor.Error).to.have.been.calledWith(404, 'Meal not found');
      });

      it('should insert a MealTemplate with the same name and date as the Meal', () => {
        createMealTemplate('find_me', 'invalid');

        expect(mealTemplateCollection.insert).to.have.been.calledWith({
          name: 'invalid',
          time: date,
          userId,
        });
      });

      it('should update an existing MealTemplate with the same name and date as the Meal', () => {
        createMealTemplate('find_me', 'find_me');

        expect(mealTemplateCollection.update).to.have.been.calledWith('find_me', {
          $set: {
            name: 'find_me',
            time: date,
            userId,
          },
        });
      });

      it('should call insert copies of the Meal dishes, setting their mealTemplateId', () => {
        createMealTemplate('find_me', 'foo');

        expect(dishCollection.insert).to.have.been.calledWith({
          mealTemplateId: 'meal_template_id',
          position: 1,
        });
      });
    });
  });
});
