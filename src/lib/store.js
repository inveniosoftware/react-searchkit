/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './state/reducers';

export const INITIAL_STORE_STATE = {
  queryString: '',
  suggestions: [],
  sortBy: null,
  sortOrder: null,
  page: 1,
  size: 10,
  filters: [],
  layout: null,
};

export const STORE_KEYS = Object.keys(INITIAL_STORE_STATE);

export function configureStore(appConfig) {
  const initialQueryState = INITIAL_STORE_STATE;

  const initialResultsState = {
    loading: false,
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

function connectExtended(mapStateToProps, mapDispatchToProps, mergeProps) {
  return connect(mapStateToProps, mapDispatchToProps, mergeProps);
}

export { connectExtended as connect };
