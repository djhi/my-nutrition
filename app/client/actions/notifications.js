import actionTypeBuilder from './actionTypeBuilder';

export const NEW_NOTIFICATION = actionTypeBuilder.type('NEW_NOTIFICATION');
export const CLEAR_NOTIFICATION = actionTypeBuilder.type('CLEAR_NOTIFICATION');

export function newNotification(level, message) {
  return {
    type: NEW_NOTIFICATION,
    level,
    message,
  };
}

export function newErrorNotification(message = 'Une erreur est survenue') {
  return {
    type: NEW_NOTIFICATION,
    level: 'danger',
    message,
  };
}

export function newSuccessNotification(message = 'Ok !') {
  return {
    type: NEW_NOTIFICATION,
    level: 'success',
    message,
  };
}

export function clearNotification() {
  return {
    type: CLEAR_NOTIFICATION,
  };
}
