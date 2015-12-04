/* global Meteor, Tracker */
import actionTypeBuilder from '../actions/actionTypeBuilder';

const handles = [];
const computations = [];

/* This middleware is used for Meteor subscriptions. It'll handle actions
 * containing a meteor object such as:
 *
 * const MY_SUBSCRIPTION = 'MY_SUBSCRIPTION';
 *
 * export function myAction (param1, param2) {
 *    return dispatch => {
 *      dispatch(myOnLoadingAction());
 *
 *      return {
 *        type: MY_SUBSCRIPTION,
 *        meteor: {
 *          subscribe: () => Meteor.subscribe('mysubscription', param1, param2),
 *          get: () => MyCollection.find(),
 *        }
 *      }
 *    }
 * }
 *
 * If you dispatch the same action more than one time with the same type, it will
 * stop and reload the subscription.
 *
 * It will dispatch a 'MY_SUBSCRIPTION_READY' action whenever the subscription.ready recompute.
 * The action will have a 'ready' property.
 *
 * It will dispatch a 'MY_SUBSCRIPTION_CHANGED' action when the subscription data change.
 * The action will have a 'data' property containing whatever your 'get' function returns.
 */
export default store => next => action => {
  if (!action.meteor || !action.meteor.subscribe) {
    return next(action);
  }

  const { subscribe, get, onChange } = action.meteor;

  // If we already have an handle for this action
  if (handles[action.type]) {
    const subscriptionId = handles[action.type].subscriptionId;
    computations[subscriptionId].stop();
    handles[action.type].stop();
  }

  const handle = subscribe();
  const subscriptionId = handle.subscriptionId;
  handles[action.type] = handle;

  computations[subscriptionId] = Tracker.autorun(() => {
    const data = get();
    const ready = handle.ready();

    store.dispatch({
      type: actionTypeBuilder.ready(action.type),
      ready,
    });

    if (ready) {
      if (onChange) {
        onChange(data);
      }

      store.dispatch({
        type: actionTypeBuilder.changed(action.type),
        data,
      });
    }
  });
};
