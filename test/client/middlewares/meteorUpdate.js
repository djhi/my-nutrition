/* eslint no-unused-expressions: 0 */
/* global Computation, Tracker, afterEach, beforeEach, describe, it, expect, sinon */
import { meteorUpdate } from 'app/client/middlewares/meteorCrud';

describe('middlewares', () => {
  describe('meteorCrud', () => {
    describe('meteorUpdate', () => {
      const store = {
        dispatch: sinon.spy(),
      };

      const newErrorNotification = sinon.spy();
      const newSuccessNotification = sinon.spy();

      const update = sinon.stub();
      update.withArgs('success', {
        name: 'success',
      }, sinon.match.any, sinon.match.func).yields();

      update.withArgs('failure', {
        name: 'failure',
      }, sinon.match.any, sinon.match.func).yields('failure');

      const collection = {
        update,
      };

      const next = sinon.spy();

      beforeEach(() => {
        next.reset();
        update.reset();
        Tracker.autorun.reset();
        Computation.stop.reset();
      });

      it('should call next if action does not have a meteor property', () => {
        const action = { type: 'update' };
        meteorUpdate(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(next).to.have.been.calledWith(action);
      });

      it('should call next if action does not have a meteor.update property', () => {
        const action = { type: 'dummy_datasource_1', meteor: {} };
        meteorUpdate(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(next).to.have.been.calledWith(action);
      });

      it('should call the collection update method with specified id, modifiers and options', () => {
        const action = { type: 'update', meteor: {
          update: {
            collection,
            id: 'success',
            modifiers: {
              name: 'success',
            },
            options: {
              foo: 'bar'
            }
          },
        }};

        meteorUpdate(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(update).to.have.been.calledWith('success', {
          name: 'success',
        }, {
          foo: 'bar'
        }, sinon.match.func);
      });

      it('should call the newSuccessNotification method if update succeed', () => {
        const action = { type: 'update', meteor: {
          update: {
            collection,
            id: 'success',
            modifiers: {
              name: 'success',
            },
          },
        }};

        meteorUpdate(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(newSuccessNotification).to.have.been.called;
      });

      it('should call the newErrorNotification method if update fails', () => {
        const action = { type: 'update', meteor: {
          update: {
            collection,
            id: 'failure',
            modifiers: {
              name: 'failure',
            },
          },
        }};

        meteorUpdate(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(newErrorNotification).to.have.been.called;
      });
    });
  });
});
