/* eslint no-unused-expressions: 0 */
/* global Accounts, beforeEach, describe, it, expect, sinon */
import inviteCoachFactory from 'app/server/methods/invites/inviteCoach';

describe('server', () => {
  describe('methods', () => {
    describe('inviteCoach', () => {
      const sendInvitation = sinon.stub();
      const findOne = sinon.stub();
      findOne.withArgs({
        userId: 'find_me',
        email: 'toto@toto.fr',
      }).returns({ _id: 'found_me'});

      findOne.withArgs({
        userId: 'invalid',
        email: 'toto@toto.fr',
      }).returns(null);

      const inviteCollection = {
        findOne: findOne,
        insert: sinon.stub(),
        update: sinon.stub(),
      };

      beforeEach(() => {
        sendInvitation.reset();
        inviteCollection.findOne.reset();
        inviteCollection.insert.reset();
        inviteCollection.update.reset();
      });

      it('should call try to find an existing invitation', () => {
        inviteCoachFactory(inviteCollection, sendInvitation)('coach_id', 'toto@toto.fr');

        expect(inviteCollection.findOne).to.have.been.calledWith({
          userId: 'coach_id',
          email: 'toto@toto.fr',
        });
      });

      it('should call insert a new invitation if it does not exist', () => {
        inviteCoachFactory(inviteCollection, sendInvitation)('invalid', 'toto@toto.fr');

        expect(inviteCollection.insert).to.have.been.calledWith({
          userId: 'invalid',
          email: 'toto@toto.fr',
          sentAt: sinon.match.date,
          token: sinon.match.string,
          role: 'coach',
        });
      });

      it('should call update an existing invitation if found', () => {
        inviteCoachFactory(inviteCollection, sendInvitation)('find_me', 'toto@toto.fr');

        expect(inviteCollection.update).to.have.been.calledWith('found_me', {
          $set: {
            sentAt: sinon.match.date,
            token: sinon.match.string,
          },
        });
      });

      it('should call sendInvitation', () => {
        inviteCoachFactory(inviteCollection, sendInvitation)('find_me', 'toto@toto.fr');

        expect(sendInvitation).to.have.been.calledWith('find_me', 'toto@toto.fr', sinon.match.string);
      });
    });
  });
});
