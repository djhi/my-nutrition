/* eslint no-unused-expressions: 0 */
/* global Computation, Tracker, afterEach, beforeEach, describe, it, expect, sinon */
import { meteorRemove } from 'app/client/middlewares/meteorCrud';

describe('middlewares', () => {
  describe('meteorCrud', () => {
    describe('meteorRemove', () => {
      const store = {
        dispatch: sinon.spy(),
      };

      const newErrorNotification = sinon.spy();
      const newSuccessNotification = sinon.spy();

      const remove = sinon.stub();
      remove.withArgs('success', sinon.match.func).callsArg(1);

      remove.withArgs('failure', sinon.match.func).callsArgWith(1, 'failure');

      const collection = {
        remove,
      };

      const next = sinon.spy();

      beforeEach(() => {
        next.reset();
        remove.reset();
        Tracker.autorun.reset();
        Computation.stop.reset();
      });

      it('should call next if action does not have a meteor property', () => {
        const action = { type: 'remove' };
        meteorRemove(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(next).to.have.been.calledWith(action);
      });

      it('should call next if action does not have a meteor.remove property', () => {
        const action = { type: 'dummy_datasource_1', meteor: {} };
        meteorRemove(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(next).to.have.been.calledWith(action);
      });

      it('should call the collection remove method with specified entity', () => {
        const action = { type: 'remove', meteor: {
          remove: {
            collection,
            id: 'success',
          },
        }};

        meteorRemove(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(remove).to.have.been.calledWith('success', sinon.match.func);
      });

      it('should call the newSuccessNotification method if remove succeed', () => {
        const action = { type: 'remove', meteor: {
          remove: {
            collection,
            id: 'success',
          },
        }};

        meteorRemove(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(newSuccessNotification).to.have.been.called;
      });

      it('should call the newErrorNotification method if remove fails', () => {
        const action = { type: 'remove', meteor: {
          remove: {
            collection,
            id: 'failure',
          },
        }};

        meteorRemove(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(newErrorNotification).to.have.been.called;
      });
    });
  });
});
