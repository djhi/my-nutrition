/* global beforeEach, describe, it, expect, sinon */
import registerAuthPublications from 'app/server/publications/auth';

describe('server', () => {
  describe('publications', () => {
    describe('auth', () => {
      const getUserData = sinon.spy();

      beforeEach(() => {
        global.Meteor.publish.reset();
        getUserData.reset();
      });

      it('should register a meteor publication named userData', () => {
        registerAuthPublications(getUserData);

        expect(global.Meteor.publish).to.have.been.calledWith('userData', sinon.match.func);
      });

      it('should register a meteor publication which call getUserData with current user id', () => {
        registerAuthPublications(getUserData);
        const call = global.Meteor.publish.getCall(0);
        call.args[1].call({ userId: 'user_id'});

        expect(getUserData).to.have.been.calledWith('user_id');
      });
    });
  });
});
