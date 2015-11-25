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
        },
      },
    });
  };
}
