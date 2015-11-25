/* global Meteor */
export default function(newSuccessNotification, newErrorNotification) {
  return store => next => action => {
    if (!action.meteor || !action.meteor.call) {
      return next(action);
    }

    const { method, parameters, onSuccess, onError } = action.meteor.call;
    const params = parameters || [];

    Meteor.call(method, ...params, error => {
      if (error) {
        if (onError) {
          return onError(error);
        }
        return store.dispatch(newErrorNotification());
      }

      if (onSuccess) {
        return onSuccess();
      }
      store.dispatch(newSuccessNotification());
    });
  };
}
