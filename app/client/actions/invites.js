import { newSuccessNotification } from './notifications';
import { updatePath } from 'redux-simple-router';

export function inviteCoach(email) {
  return dispatch => {
    dispatch({
      type: 'INVITE_COACH',
      meteor: {
        call: {
          method: 'inviteCoach',
          parameters: [
            email,
          ],
          onSuccess: () => dispatch(newSuccessNotification('L\'invitation a été envoyée à votre coach !')),
        },
      },
    });
  };
}

export function inviteCoachee(email) {
  return dispatch => {
    dispatch({
      type: 'INVITE_COACHEE',
      meteor: {
        call: {
          method: 'inviteCoachee',
          parameters: [
            email,
          ],
          onSuccess: () => {
            dispatch(newSuccessNotification('L\'invitation a été envoyée à votre client !'));

            dispatch(updatePath('/dashboard'));
          },
        },
      },
    });
  };
}
