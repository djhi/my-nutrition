/* eslint no-unused-expressions: 0 */
/* global beforeEach, describe, it, expect, sinon */
import reducer, { initialState } from 'app/client/reducers/auth';
import actionTypeBuilder from 'app/client/actions/actionTypeBuilder';
import {
  USER_LOGGING_IN,
  USER_DATA,
}
from 'app/client/actions/auth';

describe('reducers', () => {
  describe('auth', () => {
    it('should return its default state when called without state', () => {
      const state = reducer(undefined, {});

      expect(state).to.deep.equal(initialState);
    });

    it('should return the state unchanged when called without an action it does not handle', () => {
      const state = reducer({ foo: 'bar' }, {});

      expect(state).to.deep.equal({ foo: 'bar' });
    });

    it('should return the state with loggingIn set to true when called with a USER_LOGGING_IN_CHANGED action', () => {
      const state = reducer({}, { type: actionTypeBuilder.changed(USER_LOGGING_IN), data: true });

      expect(state).to.deep.equal({ loggingIn: true });
    });

    it('should return the state with the action.user when called with a USER_DATA_CHANGED action', () => {
      const state = reducer({}, { type: actionTypeBuilder.changed(USER_DATA), data: { foo: 'bar'} });

      expect(state).to.deep.equal({ user: { foo: 'bar'} });
    });
  });
});
