import makeStore from './src/store';
import startServer from './src/server';
import {
  SET_ENTRIES, NEXT
}
from './src/actions';

export const store = makeStore();
startServer(store);

store.dispatch({
  type: SET_ENTRIES,
  entries: require('./entries.json')
});
console.log('\nStore initialized', store.getState());

store.dispatch({
  type: NEXT
});
console.log('\nVote started', store.getState());
