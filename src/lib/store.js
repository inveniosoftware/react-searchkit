/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './state/reducers';
import {
  INITIAL_APP_STATE,
  INITIAL_QUERY_STATE,
  INITIAL_RESULTS_STATE,
} from './storeConfig';

export function createStoreWithConfig(appConfig) {
  const initialQueryState = {
    ...INITIAL_QUERY_STATE,
    ...appConfig.initialQueryState,
  };

  const initialResultsState = {
    ...INITIAL_RESULTS_STATE,
    loading: appConfig.searchOnInit,
  };

  const initialAppState = {
    ...INITIAL_APP_STATE,
    initialSortBy: initialQueryState.sortBy,
    initialSortOrder: initialQueryState.sortOrder,
  };

  // configure the initial state
  const preloadedQueryState = appConfig.urlHandlerApi
    ? appConfig.urlHandlerApi.get(initialQueryState)
    : initialQueryState;
  const preloadedState = {
    app: initialAppState,
    query: preloadedQueryState,
    results: initialResultsState,
  };
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk.withExtraArgument(appConfig))
  );
}
