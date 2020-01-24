import React from 'react';
import { Subject } from 'rxjs';
import _ from 'lodash';

function listen(store, cb) {
  const subscription = store.subject.subscribe({
    next: cb
  });

  return subscription;
}

function unlisten(store, subscription) {
  return subscription.unsubscribe();
}

function setState(store, newState) {
  let mergedState;

  if (typeof newState === 'object') {
    mergedState = _.merge(store.state, newState);
    store.state = mergedState;
  }

  if (typeof newState !== 'object') {
    mergedState = store.state = newState;
  }

  return store.subject.next(mergedState);
}

function useStore(store) {
  const [, originalHook] = React.useState(Object.create(null));
  const { state } = store;
  let { actions } = store;

  actions = React.useMemo(() => actions, [actions]);

  React.useEffect(() => {
    const listener = store.listen(originalHook);
    return store.unlisten.bind(null, listener);
  }, []); // eslint-disable-line

  return [state, actions];
}

function associateActions(store, actions) {
  const associatedActions = {};
  Object.keys(actions).forEach((key) => {
    associatedActions[key] = actions[key].bind(null, store);
  });
  return associatedActions;
}

const createStore = (initialState, actions) => {
  const store = {
    state: initialState,
    subject: new Subject(initialState)
  };

  store.setState = setState.bind(null, store);
  store.actions = associateActions(store, actions);
  store.listen = listen.bind(null, store);
  store.unlisten = unlisten.bind(null, store);
  store.useStore = useStore.bind(null, store);

  return store;
};

export default createStore;
