/* eslint no-unused-expressions: 0 */
/* global Meteor, beforeEach, describe, it, expect, sinon */
import {
  INVITE_COACH,
  INVITE_COACHEE,
  inviteCoach,
  inviteCoachee,
}
from 'app/client/actions/invites';

describe('actions', () => {
  const dispatch = sinon.spy();

  beforeEach(() => {
    dispatch.reset();
    Meteor.call.reset();
  });

  describe('invites', () => {
    describe('inviteCoach', () => {
      it('should dispatch a INVITE_COACH meteor action with correct parameters', () => {
        inviteCoach('foo')(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: INVITE_COACH,
          meteor: {
            call: {
              method: 'inviteCoach',
              parameters: [
                'foo',
              ],
              onSuccess: sinon.match.func,
            },
          },
        });
      });
    });

    describe('inviteCoachee', () => {
      it('should dispatch a INVITE_COACHEE meteor action with correct parameters', () => {
        inviteCoachee('foo')(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: INVITE_COACHEE,
          meteor: {
            call: {
              method: 'inviteCoachee',
              parameters: [
                'foo',
              ],
              onSuccess: sinon.match.func,
            },
          },
        });
      });
    });
  });
});
