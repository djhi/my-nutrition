/* eslint no-unused-expressions: 0 */
/* global Accounts, beforeEach, describe, it, expect, sinon */
import registerDishesHooks from 'app/server/hooks/dishes';

describe('server', () => {
  describe('hooks', () => {
    describe('registerDishesHooks', () => {
      const updateMealDishes = sinon.stub();

      const dishCollection = {
        after: {
          insert: sinon.stub(),
          update: sinon.stub(),
          remove: sinon.stub(),
        },
      };

      beforeEach(() => {
        updateMealDishes.reset();
        dishCollection.after.insert.reset();
        dishCollection.after.update.reset();
        dishCollection.after.remove.reset();
      });

      it('should call dishCollection.after.insert with correct parameters', () => {
        registerDishesHooks(dishCollection);

        expect(dishCollection.after.insert).to.have.been.calledWith(sinon.match.func);
      });

      it('should call updateMealDishes with meal id on dish insertion', () => {
        registerDishesHooks(dishCollection, updateMealDishes);
        const onInsert = dishCollection.after.insert.getCall(0).args[0];
        onInsert('user_id', { mealId: 'meal_id' });

        expect(updateMealDishes).to.have.been.calledWith('meal_id');
      });

      it('should call dishCollection.after.update with correct parameters', () => {
        registerDishesHooks(dishCollection);

        expect(dishCollection.after.update).to.have.been.calledWith(sinon.match.func);
      });

      it('should call updateMealDishes with meal id on dish update without meal change', () => {
        registerDishesHooks(dishCollection, updateMealDishes);
        const onUpdate = dishCollection.after.update.getCall(0).args[0];
        onUpdate.call({ previous: { mealId: 'meal_id' }}, 'user_id', { mealId: 'meal_id' });

        expect(updateMealDishes).to.have.been.calledWith('meal_id');
      });

      it('should call updateMealDishes with previous meal id on dish update with meal change', () => {
        registerDishesHooks(dishCollection, updateMealDishes);
        const onUpdate = dishCollection.after.update.getCall(0).args[0];
        onUpdate.call({ previous: { mealId: 'previous_meal_id' }}, 'user_id', { mealId: 'meal_id' });

        expect(updateMealDishes).to.have.been.calledWith('previous_meal_id');
        expect(updateMealDishes).to.have.been.calledWith('meal_id');
      });

      it('should call dishCollection.after.remove with correct parameters', () => {
        registerDishesHooks(dishCollection);

        expect(dishCollection.after.remove).to.have.been.calledWith(sinon.match.func);
      });

      it('should call updateMealDishes with meal id on dish removal', () => {
        registerDishesHooks(dishCollection, updateMealDishes);
        const onRemove = dishCollection.after.remove.getCall(0).args[0];
        onRemove('user_id', { mealId: 'meal_id' });

        expect(updateMealDishes).to.have.been.calledWith('meal_id');
      });
    });
  });
});
