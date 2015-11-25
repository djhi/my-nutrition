export function setUserPreferenceFactory(userCollection) {
  return (userId, preference, value) => {
    return dispatch => {
      const modifiers = {
        $set: {},
      };

      modifiers.$set[`profile.preferences.${preference}`] = value;

      dispatch({
        type: 'USER_PREFERENCE_UPDATE',
        meteor: {
          update: {
            id: userId,
            modifiers,
            collection: userCollection,
          },
        },
      });
    };
  };
}
