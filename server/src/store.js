/* beautify preserve:start */

import {createStore} from 'redux';
import reducer from './reducer';

/* beautify preserve:end */

export default function makeStore() {
  return createStore(reducer);
}
