/* eslint no-unused-expressions: 0 */
/* global Accounts, beforeEach, describe, it, expect, sinon */
import initializeAccountFromInviteFactory from 'app/server/methods/user/initializeAccountFromInvite';

describe('server', () => {
  describe('methods', () => {
    describe('initializeAccountFromInvite', () => {
      const findByToken = sinon.stub();

      findByToken.withArgs('coach').returns({
        userId: 'sender_id',
        token: 'super_token',
        role: 'coach',
      });

      findByToken.withArgs('coachee').returns({
        userId: 'sender_id',
        token: 'super_token',
        role: 'coachee',
      });

      findByToken.withArgs('invalid').returns(null);

      const inviteCollection = {
        findByToken,
      };

      const setAccountRole = sinon.spy();
      const setUserCoach = sinon.spy();

      beforeEach(() => {
        inviteCollection.findByToken.reset();
        setAccountRole.reset();
        setUserCoach.reset();
      });

      const initializeAccountFromInvite = initializeAccountFromInviteFactory(inviteCollection, setAccountRole, setUserCoach);

      it('should try to load the invitation specified by its token', () => {
        initializeAccountFromInvite('user_id', 'coach');

        expect(inviteCollection.findByToken).to.have.been.calledWith('coach');
      });

      it('should throw a 404 if no invitation can be found', () => {
        expect(initializeAccountFromInvite.bind(null, 'user_id', 'invalid')).to.throw();
      });

      it('should set the account of the specified user to the role specified in the invitation', () => {
        initializeAccountFromInvite('user_id', 'coach');

        expect(setAccountRole).to.have.been.calledWith('user_id', 'coach');
      });

      it('should set the coach of the invited coachee to be the invitation sender', () => {
        initializeAccountFromInvite('user_id', 'coachee');

        expect(setUserCoach).to.have.been.calledWith('user_id', 'sender_id');
      });

      it('should set the coach of the invitation sender to be the invited coach', () => {
        initializeAccountFromInvite('user_id', 'coach');

        expect(setUserCoach).to.have.been.calledWith('sender_id', 'user_id');
      });
    });
  });
});
