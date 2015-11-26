/* eslint no-unused-expressions: 0 */
/* global before, describe, it, expect, sinon */
import {setTitle, SET_TITLE} from 'app/client/actions/app';

describe('actions', () => {
  describe('app', () => {
    describe('setTitle', () => {
      it('should return a SET_TITLE action with new title', () => {
        const action = setTitle('WOOT');

        expect(action).to.deep.equal({
          type: SET_TITLE,
          title: 'WOOT',
        });
      });
    });
  });
});
