/* global beforeEach, describe, it, expect, sinon */
import takenAt from 'app/collections/meals/takenAt';
import moment from 'moment';

describe('collections', () => {
  describe('meals', () => {
    describe('takenAt', () => {
      it('should return the time of the meal', () => {
        const meal = {
          date: new Date(),
        };

        const result = takenAt(meal);

        expect(result).to.equal(moment(meal.date).format('HH:mm'));
      });
    });
  });
});
