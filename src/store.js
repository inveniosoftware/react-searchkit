/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './state/reducers';

const composeEnhancers = composeWithDevTools({
  name: 'React-SearchKit',
});

export function configureStore(appConfig) {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(appConfig)))
  );
}

const ReactSearchkitContext = React.createContext();

function connectExtended(mapStateToProps, mapDispatchToProps, mergeProps) {
  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    { context: ReactSearchkitContext }
  );
}

export { connectExtended as connect };
