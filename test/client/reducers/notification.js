/* eslint no-unused-expressions: 0 */
/* global beforeEach, describe, it, expect, sinon */
import reducer, { initialState } from 'app/client/reducers/notification';
import { NEW_NOTIFICATION, CLEAR_NOTIFICATION } from 'app/client/actions/notifications';

describe('reducers', () => {
  describe('notification', () => {
    it('should return its default state when called without state', () => {
      const state = reducer(undefined, {});

      expect(state).to.deep.equal(initialState);
    });

    it('should return the state unchanged when called without an action it does not handle', () => {
      const state = reducer({ foo: 'bar' }, {});

      expect(state).to.deep.equal({ foo: 'bar' });
    });

    it('should return the state with the action level and message when called with a NEW_NOTIFICATION action', () => {
      const state = reducer({}, { type: NEW_NOTIFICATION, level: 'danger', message: 'Run you fools !' });

      expect(state).to.deep.equal({ level: 'danger', message: 'Run you fools !' });
    });

    it('should return the state with level and message set to null when called with a CLEAR_NOTIFICATION action', () => {
      const state = reducer({}, { type: CLEAR_NOTIFICATION });

      expect(state).to.deep.equal({ level: null, message: null });
    });
  });
});
