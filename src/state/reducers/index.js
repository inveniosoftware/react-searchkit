/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { combineReducers } from 'redux';

import queryReducer from './query';
import resultsReducer from './results';

export default combineReducers({
  query: queryReducer,
  results: resultsReducer,
});
