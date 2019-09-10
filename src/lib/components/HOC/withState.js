/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { connect } from '../../store';

export function withState(Component) {
  const WrappedComponent = ({ dispatch, ...props }) => <Component {...props} />;
  const mapStateToProps = state => ({
    currentQueryState: state.query,
    currentResultsState: state.results,
  });

  return connect(
    mapStateToProps,
    null
  )(WrappedComponent);
}
