/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { combineReducers } from "redux";
import appReducer from "./app";
import queryReducer from "./query";
import resultsReducer from "./results";

export default combineReducers({
  app: appReducer,
  query: queryReducer,
  results: resultsReducer,
});
