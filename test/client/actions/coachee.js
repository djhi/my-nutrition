/* eslint no-unused-expressions: 0 */
/* global Meteor, beforeEach, describe, it, expect, sinon */
import {
  COACHEE,
  COACHEES,
  loadCoacheeFactory,
  loadCoacheesFactory,
}
from 'app/client/actions/coachees';

describe('actions', () => {
  const coacheeCollection = {
    find: sinon.stub().returns({ fetch: sinon.stub() }),
    findOne: sinon.stub(),
  };

  const dispatch = sinon.spy();

  beforeEach(() => {
    coacheeCollection.find.reset();
    coacheeCollection.findOne.reset();
    dispatch.reset();
    Meteor.subscribe.reset();
  });

  describe('coachee', () => {
    describe('loadCoachees', () => {
      it('should return a COACHEES action', () => {
        loadCoacheesFactory(coacheeCollection)()(dispatch);

        expect(dispatch).to.have.been.calledWith(sinon.match
          .has('type', COACHEES).and(
            sinon.match.has('meteor', sinon.match
              .has('subscribe', sinon.match.func)
              .and(sinon.match.has('get', sinon.match.func))
            )
          )
        );
      });

      it('should dispatch a meteor action subscribing to coachees', () => {
        loadCoacheesFactory(coacheeCollection)()(dispatch);

        const call = dispatch.getCall(0);
        call.args[0].meteor.subscribe();
        expect(Meteor.subscribe).to.have.been.calledWith('coachees');
      });

      it('should dispatch a meteor action gettings coachees by calling find on the coachee collection', () => {
        loadCoacheesFactory(coacheeCollection)()(dispatch);

        const call = dispatch.getCall(0);
        call.args[0].meteor.get();
        expect(coacheeCollection.find).to.have.been.calledWith({
          _id: { $ne: Meteor.userId() },
        });
      });
    });

    describe('loadCoacheeFactory', () => {
      it('should return a COACHEE action', () => {
        loadCoacheeFactory(coacheeCollection)()(dispatch);

        expect(dispatch).to.have.been.calledWith(sinon.match
          .has('type', COACHEE).and(
            sinon.match.has('meteor', sinon.match(sinon.match.has('get', sinon.match.func)))
          )
        );
      });

      it('should dispatch a meteor action gettings current coachee by calling findOne on the coachee collection', () => {
        loadCoacheeFactory(coacheeCollection)('userId')(dispatch);

        const call = dispatch.getCall(0);
        call.args[0].meteor.get();
        expect(coacheeCollection.findOne).to.have.been.calledWith('userId');
      });
    });
  });
});
