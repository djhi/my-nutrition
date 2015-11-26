/* global beforeEach, describe, it, expect, sinon */
import findByUserAndDateFactory from 'app/collections/meals/findByUserAndDate';
import moment from 'moment';

describe('collections', () => {
  describe('meals', () => {
    describe('findByUserAndDate', () => {
      it('should call find on the Meal collection with filter and sort on date', () => {
        const mealCollection = {
          find: sinon.spy(),
        };

        const dateStart = moment().startOf('day').toDate();
        const dateEnd = moment().startOf('day').toDate();

        findByUserAndDateFactory(mealCollection)('foo', dateStart, dateEnd);

        expect(mealCollection.find).to.have.been.calledWith({
          userId: 'foo',
          date: {
            $gte: dateStart,
            $lte: dateEnd,
          },
        }, {
          sort: {
            date: 1,
          },
        });
      });
    });
  });
});
