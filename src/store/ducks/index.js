import { combineReducers } from 'redux';

import auth from './auth';
import block from './block';
import basicHealthUnit from './basicHealthUnit';
import questionnaries from './questionnaries';
import interview from './interview';
import currentUBS from './currentUBS';

const reducers = combineReducers({
  auth,
  block,
  basicHealthUnit,
  questionnaries,
  interview,
  currentUBS
});

export default reducers;
