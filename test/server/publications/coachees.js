/* global beforeEach, describe, it, expect, sinon */
import registerCoacheePublications from 'app/server/publications/coachees';

describe('server', () => {
  describe('publications', () => {
    describe('coachees', () => {
      beforeEach(() => {
        global.Meteor.publish.reset();
      });

      it('should register a meteor publication named coachees', () => {
        registerCoacheePublications();

        expect(global.Meteor.publish).to.have.been.calledWith('coachees', sinon.match.func);
      });

      it('should register a meteor publication which call coacheeCollection.find', () => {
        const coacheeCollection = {
          find: sinon.spy(),
        };

        registerCoacheePublications(coacheeCollection);
        const call = global.Meteor.publish.getCall(0);
        call.args[1].call({ userId: 'user_id'});

        expect(coacheeCollection.find).to.have.been.calledWith({
          coachId: 'user_id',
        }, {
          fields: {
            'registered_emails': 1,
            'profile.name': 1,
          },
          sort: {
            'profile.name': 1,
          },
        });
      });
    });
  });
});
