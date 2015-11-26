/* eslint no-unused-expressions: 0 */
/* global before, describe, it, expect, sinon */
import {
  CLEAR_NOTIFICATION,
  NEW_NOTIFICATION,
  clearNotification,
  newNotification,
  newSuccessNotification,
  newErrorNotification,
} from 'app/client/actions/notifications';

describe('actions', () => {
  describe('notification', () => {
    describe('newNotification', () => {
      it('should return a NEW_NOTIFICATION action with given level and message', () => {
        const action = newNotification('foo', 'bar');
        expect(action).to.deep.equal({
          type: NEW_NOTIFICATION,
          level: 'foo',
          message: 'bar',
        });
      });
    });

    describe('newSuccessNotification', () => {
      it('should return a NEW_NOTIFICATION action with level set to success and a default message', () => {
        const action = newSuccessNotification();
        expect(action).to.deep.equal({
          type: NEW_NOTIFICATION,
          level: 'success',
          message: 'Ok !',
        });
      });

      it('should return a NEW_NOTIFICATION action with level set to success and given message', () => {
        const action = newSuccessNotification('foo');
        expect(action).to.deep.equal({
          type: NEW_NOTIFICATION,
          level: 'success',
          message: 'foo',
        });
      });
    });

    describe('newErrorNotification', () => {
      it('should return a NEW_NOTIFICATION action with level set to danger and a default message', () => {
        const action = newErrorNotification();
        expect(action).to.deep.equal({
          type: NEW_NOTIFICATION,
          level: 'danger',
          message: 'Une erreur est survenue',
        });
      });

      it('should return a NEW_NOTIFICATION action with level set to danger and given message', () => {
        const action = newErrorNotification('foo');
        expect(action).to.deep.equal({
          type: NEW_NOTIFICATION,
          level: 'danger',
          message: 'foo',
        });
      });
    });

    describe('clearNotification', () => {
      it('should return a CLEAR_NOTIFICATION action', () => {
        const action = clearNotification();
        expect(action).to.deep.equal({
          type: CLEAR_NOTIFICATION,
        });
      });
    });
  });
});
