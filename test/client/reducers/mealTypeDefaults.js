/* eslint no-unused-expressions: 0 */
/* global beforeEach, describe, it, expect, sinon */
import reducer, { initialState } from '../../../app/client/reducers/mealTypeDefaults';

describe('reducers', () => {
  describe('mealTypeDefaults', () => {
    it('should return its default state when called without state', () => {
      const state = reducer(undefined, {});

      expect(state).to.deep.equal(initialState);
    });

    it('should return the state unchanged when called without an action it does not handle', () => {
      const state = reducer({ foo: 'bar' }, {});

      expect(state).to.deep.equal({ foo: 'bar' });
    });

    it('should return the state with ready set to true when called with a MEAL_TYPE_DEFAULTS_READY action', () => {
      const state = reducer({}, { type: 'MEAL_TYPE_DEFAULTS_READY', ready: true });

      expect(state).to.deep.equal({ ready: true });
    });

    it('should return the state with the action.mealTypeDefaults as items when called with a MEAL_TYPE_DEFAULTS_CHANGED action', () => {
      const state = reducer({}, { type: 'MEAL_TYPE_DEFAULTS_CHANGED', data: [{ foo: 'bar'}] });

      expect(state).to.deep.equal({ items: [{ foo: 'bar'}] });
    });
  });
});
