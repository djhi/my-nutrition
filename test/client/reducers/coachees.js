/* eslint no-unused-expressions: 0 */
/* global beforeEach, describe, it, expect, sinon */
import reducer, { initialState } from 'app/client/reducers/coachees';
import actionTypeBuilder from 'app/client/actions/actionTypeBuilder';
import {
  COACHEE,
  COACHEES,
}
from 'app/client/actions/coachees';

describe('reducers', () => {
  describe('coachees', () => {
    it('should return its default state when called without state', () => {
      const state = reducer(undefined, {});

      expect(state).to.deep.equal(initialState);
    });

    it('should return the state unchanged when called without an action it does not handle', () => {
      const state = reducer({ foo: 'bar' }, {});

      expect(state).to.deep.equal({ foo: 'bar' });
    });

    it('should return the state with loading set to true when called with a COACHEE_LOADING action', () => {
      const state = reducer({}, { type: actionTypeBuilder.ready(COACHEE), ready: true });

      expect(state).to.deep.equal({ ready: true });
    });

    it('should return the state with the action.coachees as items when called with a COACHEE_CHANGED action', () => {
      const state = reducer({}, { type: actionTypeBuilder.changed(COACHEE), data: { foo: 'bar' } });

      expect(state).to.deep.equal({ current: { foo: 'bar'} });
    });

    it('should return the state with loading set to true when called with a COACHEES_LOADING action', () => {
      const state = reducer({}, { type: actionTypeBuilder.ready(COACHEES), ready: true });

      expect(state).to.deep.equal({ ready: true });
    });

    it('should return the state with the action.coachees as items when called with a COACHEES_CHANGED action', () => {
      const state = reducer({}, { type: actionTypeBuilder.changed(COACHEES), data: [{ foo: 'bar' }] });

      expect(state).to.deep.equal({ items: [{ foo: 'bar'}] });
    });
  });
});
