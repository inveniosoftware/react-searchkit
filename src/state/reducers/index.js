import { combineReducers } from 'redux';

import queryReducer from './query';
import resultsReducer from './results';
import configReducer from './config';
import searchApiReducer from './searchApi';

export default combineReducers({
  query: queryReducer,
  results: resultsReducer,
  apiConfig: configReducer,
  searchApi: searchApiReducer,
});
