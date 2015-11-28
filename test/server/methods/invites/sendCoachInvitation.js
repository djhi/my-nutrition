/* eslint no-unused-expressions: 0 */
/* global Email, Meteor, beforeEach, describe, it, expect, sinon */
import sendCoachInvitationFactory from 'app/server/methods/invites/sendCoachInvitation';

describe('server', () => {
  describe('methods', () => {
    describe('sendCoachInvitation', () => {
      const userCollection = {
        findOne: sinon.stub().returns({
          profile: {
            name: 'toto',
          },
        }),
      };

      Meteor.settings.applicationEmail = 'test@test.fr';
      Meteor.settings.applicationName = 'foo';
      Meteor.settings.applicationSignUpUrl = 'sign_up_url';

      const sendCoachInvitation = sendCoachInvitationFactory(userCollection);

      beforeEach(() => {
        userCollection.findOne.reset();
        Email.send.reset();
      });

      it('should retrieve the coachee sending the invitation', () => {
        sendCoachInvitation('coachee_id', 'toto@toto.fr');

        expect(userCollection.findOne).to.have.been.calledWith('coachee_id');
      });

      it('should send the invitation email', () => {
        sendCoachInvitation('coachee_id', 'toto@toto.fr');

        expect(Email.send).to.have.been.calledWith({
          to: 'toto@toto.fr',
          from: Meteor.settings.applicationEmail,
          subject: `${Meteor.settings.applicationName} - Activation de votre compte`,
          text: sinon.match.string,
          html: sinon.match.string,
        });
      });

      it('should send the invitation email with reference to the sender\'s name', () => {
        sendCoachInvitation('coachee_id', 'toto@toto.fr');
        const call = Email.send.getCall(0);
        const emailOptions = call.args[0];

        expect(emailOptions.text).to.have.contains('toto');
        expect(emailOptions.html).to.have.contains('toto');
      });

      it('should send the invitation email with a link to signup containing the invitation token', () => {
        sendCoachInvitation('coachee_id', 'toto@toto.fr', 'super_token');
        const call = Email.send.getCall(0);
        const emailOptions = call.args[0];

        expect(emailOptions.text).to.have.contains(`${Meteor.settings.applicationSignUpUrl}/super_token`);
        expect(emailOptions.html).to.have.contains(`${Meteor.settings.applicationSignUpUrl}/super_token`);
      });
    });
  });
});
