/* global Accounts, Meteor, Roles */
import { newNotification } from './notifications';
import { pushState } from 'redux-router';

export function loadUser() {
  return dispatch => {
    dispatch({
      type: 'USER_LOGGING_IN',
      meteor: {
        get: () => Meteor.loggingIn(),
      },
    });

    dispatch({
      type: 'USER_DATA',
      meteor: {
        subscribe: () => Meteor.subscribe('userData'),
        get: () => Meteor.user(),
      },
    });
  };
}

export function logout() {
  return dispatch => {
    Meteor.logout(err => {
      if (err) {
        return dispatch(newNotification('danger', 'Une erreur est survenue pendant votre déconnexion.'));
      }

      dispatch(pushState(null, '/'));
    });
  };
}

export function setAccountAsCoach() {
  return dispatch => {
    dispatch({
      type: 'SET_ACCOUNT_AS_COACH',
      meteor: {
        call: {
          method: 'setAccountAsCoach',
        },
      },
    });
  };
}

export function setAccountAsCoachee() {
  return dispatch => {
    dispatch({
      type: 'SET_ACCOUNT_AS_COACHEE',
      meteor: {
        call: {
          method: 'setAccountAsCoachee',
        },
      },
    });
  };
}

export function loginWithGoogle() {
  return dispatch => {
    Meteor.loginWithGoogle(err => {
      if (err) {
        return dispatch(newNotification('danger', 'Une erreur est survenue pendant votre authentification.'));
      }
    });
  };
}

export function loginWithFacebook() {
  return dispatch => {
    Meteor.loginWithFacebook(err => {
      if (err) {
        return dispatch(newNotification('danger', 'Une erreur est survenue pendant votre authentification.'));
      }
    });
  };
}

export function loginWithPassword(email, password) {
  return dispatch => {
    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        return dispatch(newNotification('danger', 'Une erreur est survenue pendant votre authentification.'));
      }
    });
  };
}

export function requirePasswordReset(email) {
  return dispatch => {
    Meteor.forgotPassword({email}, err => {
      if (err) {
        return dispatch(newNotification('danger', 'Une erreur est survenue pendant la réinitialisation de votre de passe.'));
      }
    });
  };
}

export function signUp(email, password, name) {
  return dispatch => {
    Accounts.createUser({email, password, profile: { name } }, err => {
      if (err) {
        return dispatch(newNotification('danger', 'Une erreur est survenue pendant la création de votre compte.'));
      }
    });
  };
}
