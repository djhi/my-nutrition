/* global Meteor, beforeEach, describe, it, expect, sinon */
import registerMealPublications from 'app/server/publications/meals';
import moment from 'moment';

describe('server', () => {
  describe('publications', () => {
    describe('meals', () => {
      const checkUserHasAccessToUserPlanning = sinon.stub();
      checkUserHasAccessToUserPlanning.withArgs('user_id_with_access', 'user_id').returns(true);
      checkUserHasAccessToUserPlanning.withArgs('user_id_without_access', 'user_id').returns(false);

      const mealCollection = {
        findByUserAndDate: sinon.spy(),
      };

      const error = sinon.stub();

      beforeEach(() => {
        global.Meteor.publish.reset();
        mealCollection.findByUserAndDate.reset();
        checkUserHasAccessToUserPlanning.reset();
        error.reset();
      });

      it('should register a meteor publication named meals', () => {
        registerMealPublications();

        expect(global.Meteor.publish).to.have.been.calledWith('meals', sinon.match.func);
      });

      it('should register a meteor publication which call dishCollection.findByUserAndDate with given date and current user', () => {
        const dateStart = moment().startOf('day').toDate();
        const dateEnd = moment().startOf('day').toDate();

        registerMealPublications(mealCollection, checkUserHasAccessToUserPlanning);
        const call = global.Meteor.publish.getCall(0);
        call.args[1].call({ userId: 'user_id'}, dateStart, dateEnd);

        expect(mealCollection.findByUserAndDate).to.have.been.calledWith('user_id', dateStart, dateEnd);
      });

      it('should register a meteor publication which call checkUserHasAccessToUserPlanning with current user and specified user if different than the current user', () => {
        const dateStart = moment().startOf('day').toDate();
        const dateEnd = moment().startOf('day').toDate();

        registerMealPublications(mealCollection, checkUserHasAccessToUserPlanning);
        const call = global.Meteor.publish.getCall(0);
        call.args[1].call({ userId: 'user_id_with_access'}, dateStart, dateEnd, 'user_id');

        expect(checkUserHasAccessToUserPlanning).to.have.been.calledWith('user_id_with_access', 'user_id');
      });

      it('should register a meteor publication which call returns a 401 error if current user has not access to the specified user', () => {
        const dateStart = moment().startOf('day').toDate();
        const dateEnd = moment().startOf('day').toDate();

        registerMealPublications(mealCollection, checkUserHasAccessToUserPlanning);
        const call = global.Meteor.publish.getCall(0);
        call.args[1].call({ userId: 'user_id_without_access', error }, dateStart, dateEnd, 'user_id');

        expect(checkUserHasAccessToUserPlanning).to.have.been.calledWith('user_id_without_access', 'user_id');
        expect(error).to.have.been.calledWith(new Meteor.Error(401, 'Unauthorized'));
      });
    });
  });
});
