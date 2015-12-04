/* eslint no-unused-expressions: 0 */
/* global Accounts, Meteor, beforeEach, describe, it, expect, sinon */
import {
  USER_LOGGING_IN,
  USER_DATA,
  SET_ACCOUNT_AS_COACH,
  SET_ACCOUNT_AS_COACHEE,
  INITIALIZE_ACCOUNT_FROM_INVITE,
  loadUser,
  logout,
  loginWithGoogle,
  loginWithFacebook,
  loginWithPassword,
  requirePasswordReset,
  setAccountAsCoach,
  setAccountAsCoachee,
  signUp,
}
from 'app/client/actions/auth';

import {
  NEW_NOTIFICATION,
}
from 'app/client/actions/notifications';

describe('actions', () => {
  describe('auth', () => {
    const dispatch = sinon.spy();

    beforeEach(() => {
      Meteor.loggingIn.reset();
      Meteor.loginWithGoogle.reset();
      Meteor.loginWithFacebook.reset();
      Meteor.logout.reset();
      Meteor.user.reset();
      dispatch.reset();
    });

    describe('loadUser', () => {
      it('should dispatch a USER_LOGGING_IN meteor action checking for Meteor.loggingIn()', () => {
        loadUser()(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: USER_LOGGING_IN,
          meteor: {
            get: sinon.match.func,
          },
        });

        const call = dispatch.getCall(0);
        call.args[0].meteor.get();

        expect(Meteor.loggingIn).to.have.been.called;
      });

      it('should dispatch a USER_DATA meteor action subscribing to userData', () => {
        loadUser()(dispatch);

        const call = dispatch.getCall(1);
        expect(call).to.have.been.calledWith({
          type: USER_DATA,
          meteor: {
            subscribe: sinon.match.func,
            get: sinon.match.func,
          },
        });

        call.args[0].meteor.subscribe();

        expect(Meteor.subscribe).to.have.been.calledWith('userData');
      });

      it('should dispatch a USER_DATA meteor action with a get function calling Meteor.user function', () => {
        loadUser()(dispatch);

        const call = dispatch.getCall(1);
        call.args[0].meteor.get();

        expect(Meteor.user).to.have.been.called;
      });
    });

    describe('logout', () => {
      it('should call Meteor.logout()', () => {
        logout()(dispatch);

        expect(Meteor.logout).to.have.been.called;
      });

      it('should dipatch a NEW_NOTIFICATION when Meteor.logout() returns an error', () => {
        Meteor.logout = sinon.stub().callsArgWith(0, new Error());

        logout()(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: NEW_NOTIFICATION,
          level: 'danger',
          message: 'Une erreur est survenue pendant votre déconnexion.',
        });
      });
    });

    describe('loginWithGoogle', () => {
      it('should call Meteor.loginWithGoogle()', () => {
        Meteor.loginWithGoogle = sinon.stub().callsArg(0);

        loginWithGoogle()(dispatch);

        expect(Meteor.loginWithGoogle).to.have.been.called;
      });

      it('should dipatch a NEW_NOTIFICATION when Meteor.loginWithGoogle() returns an error', () => {
        Meteor.loginWithGoogle = sinon.stub().callsArgWith(0, new Error());

        loginWithGoogle()(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: NEW_NOTIFICATION,
          level: 'danger',
          message: 'Une erreur est survenue pendant votre authentification.',
        });
      });
    });

    describe('loginWithFacebook', () => {
      it('should call Meteor.loginWithFacebook()', () => {
        loginWithFacebook()(dispatch);

        expect(Meteor.loginWithFacebook).to.have.been.called;
      });

      it('should dipatch a NEW_NOTIFICATION when Meteor.loginWithFacebook() returns an error', () => {
        Meteor.loginWithFacebook = sinon.stub().callsArgWith(0, new Error());

        loginWithFacebook()(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: NEW_NOTIFICATION,
          level: 'danger',
          message: 'Une erreur est survenue pendant votre authentification.',
        });
      });
    });

    describe('loginWithPassword', () => {
      it('should call Meteor.loginWithPassword()', () => {
        loginWithPassword('email', 'password')(dispatch);

        expect(Meteor.loginWithPassword).to.have.been.calledWith('email', 'password');
      });

      it('should dipatch a NEW_NOTIFICATION when Meteor.loginWithPassword() returns an error', () => {
        Meteor.loginWithPassword.withArgs('email_error', 'password').callsArgWith(2, new Error());

        loginWithPassword('email_error', 'password')(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: NEW_NOTIFICATION,
          level: 'danger',
          message: 'Une erreur est survenue pendant votre authentification.',
        });
      });
    });

    describe('requirePasswordReset', () => {
      it('should call Meteor.forgotPassword()', () => {
        requirePasswordReset('email')(dispatch);

        expect(Meteor.forgotPassword).to.have.been.calledWith({
          email: 'email',
        });
      });

      it('should dipatch a NEW_NOTIFICATION when Meteor.forgotPassword() returns an error', () => {
        Meteor.forgotPassword.withArgs({
          email: 'email_error',
        }).callsArgWith(1, new Error());

        requirePasswordReset('email_error')(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: NEW_NOTIFICATION,
          level: 'danger',
          message: 'Une erreur est survenue pendant la réinitialisation de votre de passe.',
        });
      });
    });

    describe('setAccountAsCoach', () => {
      it('should dipatch a meteor action calling method setAccountAsCoach', () => {
        setAccountAsCoach()(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: SET_ACCOUNT_AS_COACH,
          meteor: {
            call: {
              method: 'setAccountAsCoach',
              onSuccess: sinon.match.func,
            },
          },
        });
      });
    });

    describe('setAccountAsCoachee', () => {
      it('should dipatch a meteor action calling method setAccountAsCoachee', () => {
        setAccountAsCoachee()(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: SET_ACCOUNT_AS_COACHEE,
          meteor: {
            call: {
              method: 'setAccountAsCoachee',
              onSuccess: sinon.match.func,
            },
          },
        });
      });
    });

    describe('signUp', () => {
      it('should call Accounts.createUser()', () => {
        signUp('email', 'password', 'name', 'token')(dispatch);

        expect(Accounts.createUser).to.have.been.calledWith({
          email: 'email',
          password: 'password',
          profile: {
            name: 'name',
            token: 'token',
          },
        });
      });

      it('should dipatch a NEW_NOTIFICATION when Accounts.createUser() returns an error', () => {
        Accounts.createUser.withArgs({
          email: 'invalid',
          password: 'password',
          profile: {
            name: 'name',
            token: undefined,
          },
        }).callsArgWith(1, new Error());

        signUp('invalid', 'password', 'name')(dispatch);

        expect(dispatch).to.have.been.calledWith({
          type: NEW_NOTIFICATION,
          level: 'danger',
          message: 'Une erreur est survenue pendant la création de votre compte.',
        });
      });
    });
  });
});
