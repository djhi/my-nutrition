/* eslint no-unused-expressions: 0 */
/* global Computation, Tracker, afterEach, beforeEach, describe, it, expect, sinon */
import { meteorInsert } from 'app/client/middlewares/meteorCrud';

describe('middlewares', () => {
  describe('meteorCrud', () => {
    describe('meteorInsert', () => {
      const store = {
        dispatch: sinon.spy(),
      };

      const newErrorNotification = sinon.spy();
      const newSuccessNotification = sinon.spy();

      const insert = sinon.stub();
      insert.withArgs({
        name: 'success',
      }, sinon.match.func).callsArg(1);

      insert.withArgs({
        name: 'failure',
      }, sinon.match.func).callsArgWith(1, 'failure');

      const collection = {
        insert,
      };

      const next = sinon.spy();

      beforeEach(() => {
        next.reset();
        insert.reset();
        Tracker.autorun.reset();
        Computation.stop.reset();
      });

      it('should call next if action does not have a meteor property', () => {
        const action = { type: 'insert' };
        meteorInsert(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(next).to.have.been.calledWith(action);
      });

      it('should call next if action does not have a meteor.insert property', () => {
        const action = { type: 'dummy_datasource_1', meteor: {} };
        meteorInsert(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(next).to.have.been.calledWith(action);
      });

      it('should call the collection insert method with specified entity', () => {
        const action = { type: 'insert', meteor: {
          insert: {
            collection,
            entity: {
              name: 'success',
            },
          },
        }};

        meteorInsert(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(insert).to.have.been.calledWith({
          name: 'success',
        }, sinon.match.func);
      });

      it('should call the newSuccessNotification method if insert succeed', () => {
        const action = { type: 'insert', meteor: {
          insert: {
            collection,
            entity: {
              name: 'success',
            },
          },
        }};

        meteorInsert(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(newSuccessNotification).to.have.been.called;
      });

      it('should call the newErrorNotification method if insert fails', () => {
        const action = { type: 'insert', meteor: {
          insert: {
            collection,
            entity: {
              name: 'failure',
            },
          },
        }};

        meteorInsert(newSuccessNotification, newErrorNotification)(store)(next)(action);

        expect(newErrorNotification).to.have.been.called;
      });
    });
  });
});
