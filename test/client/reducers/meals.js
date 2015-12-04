/* eslint no-unused-expressions: 0 */
/* global beforeEach, describe, it, expect, sinon */
import reducer, { initialState } from 'app/client/reducers/meals';
import actionTypeBuilder from 'app/client/actions/actionTypeBuilder';
import {
  MEALS,
}
from 'app/client/actions/meals';

describe('reducers', () => {
  describe('meals', () => {
    it('should return its default state when called without state', () => {
      const state = reducer(undefined, {});

      expect(state).to.deep.equal(initialState);
    });

    it('should return the state unchanged when called without an action it does not handle', () => {
      const state = reducer({ foo: 'bar' }, {});

      expect(state).to.deep.equal({ foo: 'bar' });
    });

    it('should return the state with loading set to true when called with a MEALS_LOADING action', () => {
      const state = reducer({}, { type: actionTypeBuilder.ready(MEALS), ready: true });

      expect(state).to.deep.equal({ ready: true });
    });

    it('should return the state with the action.meals as items when called with a MEALS_CHANGED action', () => {
      const state = reducer({}, { type: actionTypeBuilder.changed(MEALS), data: [{ foo: 'bar' }] });

      expect(state).to.deep.equal({ items: [{ foo: 'bar'}] });
    });
  });
});
