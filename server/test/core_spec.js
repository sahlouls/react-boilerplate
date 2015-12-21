/* beautify preserve:start */

import {expect} from 'chai';
import {List, Map} from 'immutable';
import {setEntries, next, vote} from '../src/core';

/* beautify preserve:end */

describe('application logic', () => {

  /** @test {core} */
  describe('setEntries', () => {

    /** @test {core#setEntries} */
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });
  });

  /** @test {core} */
  describe('next', () => {

    /** @test {core#next} */
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }));
    });

    /** @test {core#next} */
    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting')
      }));
    });

    /** @test {core#next} */
    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 3
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
      }));
    });

    /** @test {core#next} */
    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            '28 Days Later': 2,
            'Trainspotting': 4
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      }));
    });

  });

  /** @test {core} */
  describe('vote', () => {

    /** @test {core#vote} */
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1
          })
        }),
        entries: List()
      }));
    });

    /** @test {core#vote} */
    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List()
      }));
    });

  });

});
