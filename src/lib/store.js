/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _isEmpty from "lodash/isEmpty";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./state/reducers";
import {
  INITIAL_APP_STATE,
  INITIAL_QUERY_STATE,
  INITIAL_RESULTS_STATE,
} from "./storeConfig";

function isSortingDifferent(
  { sortBy: sortBy1, sortOrder: sortOrder1 },
  { sortBy: sortBy2, sortOrder: sortOrder2 }
) {
  const differentSortBy = sortBy1 !== sortBy2;
  const differentSortOrder = sortOrder1 !== sortOrder2;
  return differentSortBy || differentSortOrder;
}

function urlParamsChangedSorting(
  appConfig,
  initialQueryState,
  queryStateFromURLParams
) {
  // check if the sorting has been changed by the URL params
  // it is not the initial or defaultOnEmpty values
  const differInitialSorting = isSortingDifferent(
    queryStateFromURLParams,
    initialQueryState
  );

  const isDefaultOnEmptyDefined = !_isEmpty(appConfig.defaultSortingOnEmptyQueryString);
  let differDefaultOnEmtpy = false;
  if (isDefaultOnEmptyDefined) {
    differDefaultOnEmtpy = isSortingDifferent(
      queryStateFromURLParams,
      appConfig.defaultSortingOnEmptyQueryString
    );
  }

  const isDifferentThanInitialAndDefaultOnEmpty =
    differInitialSorting && differDefaultOnEmtpy;
  return isDifferentThanInitialAndDefaultOnEmpty;
}

function getInitialState(appConfig) {
  // update `query` state
  const initialQueryState = {
    ...INITIAL_QUERY_STATE,
    ...appConfig.initialQueryState,
  };

  // update initial state depending on URL params values
  const queryStateFromURLParams = appConfig.urlHandlerApi
    ? appConfig.urlHandlerApi.get(initialQueryState)
    : initialQueryState;

  // the sorting value in URL params takes precedence
  // evaluate if URL params have sorting with a specific value
  // that is not initial or defaultOnEmpty
  const hasUserChangedSorting = urlParamsChangedSorting(
    appConfig,
    initialQueryState,
    queryStateFromURLParams
  );

  // update `app` state
  const initialAppState = {
    ...INITIAL_APP_STATE,
    hasUserChangedSorting: hasUserChangedSorting,
    initialSortBy: initialQueryState.sortBy,
    initialSortOrder: initialQueryState.sortOrder,
  };

  // update `results` state
  const initialResultsState = {
    ...INITIAL_RESULTS_STATE,
    loading: appConfig.searchOnInit,
  };

  return {
    app: initialAppState,
    query: queryStateFromURLParams,
    results: initialResultsState,
  };
}

export function createStoreWithConfig(appConfig) {
  const preloadedState = getInitialState(appConfig);
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk.withExtraArgument(appConfig))
  );
}
