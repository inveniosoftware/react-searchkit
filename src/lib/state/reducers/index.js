/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
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
