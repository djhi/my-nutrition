/* eslint no-unused-expressions: 0 */
/* global Meteor, afterEach, beforeEach, describe, it, expect, sinon */
import meteorMethod from 'app/client/middlewares/meteorMethod';

describe('middlewares', () => {
  describe('meteorMethod', () => {
    const store = {
      dispatch: sinon.spy(),
    };

    const newErrorNotification = sinon.spy();
    const newSuccessNotification = sinon.spy();

    Meteor.call.withArgs('success', sinon.match.func).yields();
    Meteor.call.withArgs('failure', sinon.match.func).yields('failure');

    const next = sinon.spy();

    beforeEach(() => {
      newErrorNotification.reset();
      newSuccessNotification.reset();
      next.reset();
      Meteor.call.reset();
    });

    it('should call next if action does not have a meteor property', () => {
      const action = { type: 'insert' };
      meteorMethod(newSuccessNotification, newErrorNotification)(store)(next)(action);

      expect(next).to.have.been.calledWith(action);
    });

    it('should call next if action does not have a meteor.method property', () => {
      const action = { type: 'dummy_datasource_1', meteor: {} };
      meteorMethod(newSuccessNotification, newErrorNotification)(store)(next)(action);

      expect(next).to.have.been.calledWith(action);
    });

    it('should call Meteor.call method with correct parameters', () => {
      const action = { type: 'foo', meteor: {
        call: {
          method: 'bar',
          parameters: [42, 'bazinga'],
        },
      }};

      meteorMethod(newSuccessNotification, newErrorNotification)(store)(next)(action);

      expect(Meteor.call).to.have.been.calledWithExactly('bar', 42, 'bazinga', sinon.match.func);
    });

    it('should call Meteor.call method with correct parameters when no parameters are supplied', () => {
      const action = { type: 'foo', meteor: {
        call: {
          method: 'bar',
        },
      }};

      meteorMethod(newSuccessNotification, newErrorNotification)(store)(next)(action);

      expect(Meteor.call).to.have.been.calledWithExactly('bar', sinon.match.func);
    });

    it('should call the newSuccessNotification method if method succeed', () => {
      const action = { type: 'foo', meteor: {
        call: {
          method: 'success',
        },
      }};

      meteorMethod(newSuccessNotification, newErrorNotification)(store)(next)(action);

      expect(newSuccessNotification).to.have.been.called;
    });

    it('should call the newErrorNotification method if method fails', () => {
      const action = { type: 'foo', meteor: {
        call: {
          method: 'failure',
        },
      }};

      meteorMethod(newSuccessNotification, newErrorNotification)(store)(next)(action);

      expect(newErrorNotification).to.have.been.called;
    });
  });
});
