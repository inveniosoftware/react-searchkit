/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { connect } from "react-redux";
import { updateQueryState } from "../../state/actions";

export function withState(Component) {
  const WrappedComponent = (props) => <Component {...props} />;
  const mapStateToProps = (state) => ({
    currentQueryState: state.query,
    currentResultsState: state.results,
  });

  const mapDispatchToProps = (dispatch) => ({
    updateQueryState: (queryState) => dispatch(updateQueryState(queryState)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
