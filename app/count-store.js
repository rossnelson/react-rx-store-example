import createStore from './store';

const actions = {
  incrementCount(store, amount) {
    store.setState(store.state + amount);
  }
};

const initialState = 0;

const store = createStore(initialState, actions);

export default store;
