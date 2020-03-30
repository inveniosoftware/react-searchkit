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
import { INITIAL_STORE_STATE } from './storeConfig';

export function configureStore(appConfig) {
  const initialQueryState = INITIAL_STORE_STATE;

  const initialResultsState = {
    loading: true,
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
