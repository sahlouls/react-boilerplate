/* beautify preserve:start */

import {List, Map} from 'immutable';

/* beautify preserve:end */

export const INITIAL_STATE = Map();

/*****************
 * setEntries
 *
 * @param {Map}   state
 * @param {List}  entries
 * @returns {Map}
 */
export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

/*****************
 * getWinners
 *
 * @param {Map}   vote
 * @returns {List}
 */
function getWinners(vote) {
  if (!vote) {
    return [];
  }
  const [a, b] = vote
    .get('pair');
  const first = vote.getIn(['tally', a], 0);
  const second = vote.getIn(['tally', b], 0);

  if (first > second) {
    return [a];
  } else if (first < second) {
    return [b];
  } else {
    return [a, b];
  }
}

/*****************
 * next
 *
 * @param {Map}   state
 * @returns {Map}
 */
export function next(state) {
  const entries = state.get('entries').concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({
        round: state.getIn(['vote', 'round'], 0) + 1,
        pair: entries.take(2)
      }),
      entries: entries.skip(2)
    });
  }
}

/*****************
 * vote
 *
 * @param {Map}     state
 * @param {string}  entry
 * @returns {Map}
 */
export function vote(voteState, entry) {
  if (voteState.get('pair').includes(entry)) {
    return voteState.updateIn(
      ['tally', entry],
      0,
      tally => tally + 1
    );
  } else {
    return voteState;
  }
}
