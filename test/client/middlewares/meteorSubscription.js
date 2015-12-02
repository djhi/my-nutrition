/* eslint no-unused-expressions: 0 */
/* global Tracker, TrackerStub, Computation, afterEach, beforeEach, describe, it, expect, sinon */
import meteorSubscriptionMiddleware from 'app/client/middlewares/meteorSubscription';
import actionTypeBuilder from 'app/client/actions/actionTypeBuilder';

describe('middlewares', () => {
  describe('meteorSubscription', () => {
    const store = {
      dispatch: sinon.spy(),
    };

    const next = sinon.spy();
    const ready = sinon.stub();
    ready.onFirstCall().returns(false);
    ready.onSecondCall().returns(true);
    const subscription = {
      ready,
      stop: sinon.stub(),
    };

    const subscribe = sinon.stub().returns(subscription);
    const get = sinon.stub().returns('foo');

    afterEach(() => {
      next.reset();
      subscribe.reset();
      subscription.ready.reset();
      subscription.stop.reset();
      get.reset();
      Tracker.autorun.reset();
      Computation.stop.reset();
    });

    it('should call next if action does not have a meteor property', () => {
      const action = { type: 'dummy_sub_1' };
      meteorSubscriptionMiddleware(store)(next)(action);

      expect(next).to.have.been.calledWith(action);
    });

    it('should call next if action does not have a meteor.subscribe property', () => {
      const action = { type: 'dummy_sub_2', meteor: {} };
      meteorSubscriptionMiddleware(store)(next)(action);

      expect(next).to.have.been.calledWith(action);
    });

    it('should call action.meteor.subscribe() if action does have a meteor.subscribe property', () => {
      const action = { type: 'dummy_sub_3', meteor: {
        subscribe,
        get,
      }};

      meteorSubscriptionMiddleware(store)(next)(action);

      expect(action.meteor.subscribe).to.have.been.called;
    });

    it('should call the Tracker autorun method', () => {
      const action = { type: 'dummy_sub_4', meteor: {
        subscribe,
        get,
      }};

      meteorSubscriptionMiddleware(store)(next)(action);

      expect(Tracker.autorun).to.have.been.called;
    });

    it('should call the Tracker computation stop method if action has been dispatched twice with the same type', () => {
      const action = { type: 'dummy_sub_5', meteor: {
        subscribe,
        get,
      }};

      meteorSubscriptionMiddleware(store)(next)(action);
      meteorSubscriptionMiddleware(store)(next)(action);

      expect(Computation.stop).to.have.been.called;
    });

    it('should call action.meteor.get function', () => {
      const action = { type: 'dummy_sub_6', meteor: {
        subscribe,
        get,
      }};

      meteorSubscriptionMiddleware(store)(next)(action);

      expect(action.meteor.get).to.have.been.called;
    });

    it('should dispatch a ready action immediatly', () => {
      const action = { type: 'dummy_sub_7', meteor: {
        subscribe,
        get,
      }};

      meteorSubscriptionMiddleware(store)(next)(action);

      expect(store.dispatch).to.have.been.calledWith({
        type: actionTypeBuilder.ready('dummy_sub_7'),
        ready: false,
      });
    });
  });
});
