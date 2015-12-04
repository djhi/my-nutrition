/* global Accounts, Meteor, Roles */
import actionTypeBuilder from './actionTypeBuilder';
import { newNotification } from './notifications';
import { updatePath } from 'redux-simple-router';

export const USER_LOGGING_IN = actionTypeBuilder.type('USER_LOGGING_IN');
export const USER_DATA = actionTypeBuilder.type('USER_DATA');
export const SET_ACCOUNT_AS_COACH = actionTypeBuilder.type('SET_ACCOUNT_AS_COACH');
export const SET_ACCOUNT_AS_COACHEE = actionTypeBuilder.type('SET_ACCOUNT_AS_COACHEE');
export const INITIALIZE_ACCOUNT_FROM_INVITE = actionTypeBuilder.type('INITIALIZE_ACCOUNT_FROM_INVITE');

export function loadUser() {
  return dispatch => {
    dispatch({
      type: USER_LOGGING_IN,
      meteor: {
        get: () => Meteor.loggingIn(),
      },
    });

    dispatch({
      type: USER_DATA,
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

      dispatch(updatePath('/'));
    });
  };
}

export function setAccountAsCoach() {
  return dispatch => {
    dispatch({
      type: SET_ACCOUNT_AS_COACH,
      meteor: {
        call: {
          method: 'setAccountAsCoach',
          onSuccess: () => dispatch(updatePath('/dashboard')),
        },
      },
    });
  };
}

export function setAccountAsCoachee() {
  return dispatch => {
    dispatch({
      type: SET_ACCOUNT_AS_COACHEE,
      meteor: {
        call: {
          method: 'setAccountAsCoachee',
          onSuccess: () => dispatch(updatePath('/planning')),
        },
      },
    });
  };
}

export function initializeAccountFromInvite(token) {
  return dispatch => {
    dispatch({
      type: INITIALIZE_ACCOUNT_FROM_INVITE,
      meteor: {
        call: {
          method: 'initializeAccountFromInvite',
          parameters: [token],
          onSuccess: role => {
            if (role === 'coachee') {
              return dispatch(updatePath('/planning'));
            }

            dispatch(updatePath('/dashboard'));
          },
        },
      },
    });
  };
}

export function handleSignedIn(dispatch, token) {
  const user = Meteor.user();

  if (user && (!user.roles || user.roles.length === 0)) {
    if (token) {
      return dispatch(initializeAccountFromInvite(token));
    }

    dispatch(updatePath(`/account-type`));
  }
}

export function loginWithGoogle(token) {
  return dispatch => {
    Meteor.loginWithGoogle(err => {
      if (err) {
        return dispatch(newNotification('danger', 'Une erreur est survenue pendant votre authentification.'));
      }

      handleSignedIn(dispatch, token);
    });
  };
}

export function loginWithFacebook(token) {
  return dispatch => {
    Meteor.loginWithFacebook(err => {
      if (err) {
        return dispatch(newNotification('danger', 'Une erreur est survenue pendant votre authentification.'));
      }

      handleSignedIn(dispatch, token);
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

export function signUp(email, password, name, token) {
  return dispatch => {
    Accounts.createUser({email, password, profile: { name, token } }, err => {
      if (err) {
        return dispatch(newNotification('danger', 'Une erreur est survenue pendant la création de votre compte.'));
      }
    });
  };
}
