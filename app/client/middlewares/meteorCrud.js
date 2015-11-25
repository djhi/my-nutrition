export function meteorInsert(newSuccessNotification, newErrorNotification) {
  return store => next => action => {
    if (!action.meteor || !action.meteor.insert) {
      return next(action);
    }

    const { collection, entity } = action.meteor.insert;

    collection.insert(entity, error => {
      if (error) {
        return store.dispatch(newErrorNotification());
      }

      store.dispatch(newSuccessNotification());
    });
  };
}

export function meteorUpdate(newSuccessNotification, newErrorNotification) {
  return store => next => action => {
    if (!action.meteor || !action.meteor.update) {
      return next(action);
    }

    const { collection, modifiers, id, options } = action.meteor.update;

    collection.update(id, modifiers, options, error => {
      if (error) {
        return store.dispatch(newErrorNotification());
      }

      store.dispatch(newSuccessNotification());
    });
  };
}

export function meteorRemove(newSuccessNotification, newErrorNotification) {
  return store => next => action => {
    if (!action.meteor || !action.meteor.remove) {
      return next(action);
    }

    const { collection, id } = action.meteor.remove;

    collection.remove(id, error => {
      if (error) {
        return store.dispatch(newErrorNotification());
      }

      store.dispatch(newSuccessNotification());
    });
  };
}
