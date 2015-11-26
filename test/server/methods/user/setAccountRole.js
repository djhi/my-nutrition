/* eslint no-unused-expressions: 0 */
/* global Accounts, beforeEach, describe, it, expect, sinon */
import setAccountRoleFactory from 'app/server/methods/user/setAccountRole';

describe('server', () => {
  describe('methods', () => {
    describe('setAccountRole', () => {
      const roles = {
        addUsersToRoles: sinon.stub(),
      };

      beforeEach(() => {
        roles.addUsersToRoles.reset();
      });

      it('should call roles.addUsersToRoles with correct parameters', () => {
        setAccountRoleFactory(roles)('user_id', 'fake_role');

        expect(roles.addUsersToRoles).to.have.been.calledWith('user_id', 'fake_role');
      });
    });
  });
});
