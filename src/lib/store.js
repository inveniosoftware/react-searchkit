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
import { INITIAL_STORE_STATE } from './storeConfig';

export function configureStore(appConfig) {
  const initialQueryState = {
    ...INITIAL_STORE_STATE,
    ...appConfig.initialQueryState,
  };

  const initialResultsState = {
    loading: appConfig.searchOnInit,
    data: {
      hits: [],
      total: 0,
      aggregations: {},
    },
    error: {},
  };

  // configure the initial state
  const preloadedQueryState = appConfig.urlHandlerApi
    ? appConfig.urlHandlerApi.get(initialQueryState)
    : initialQueryState;
  const preloadedState = {
    query: preloadedQueryState,
    results: initialResultsState,
  };
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk.withExtraArgument(appConfig))
  );
}
