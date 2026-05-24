/*
 * SPDX-FileCopyrightText: 2019-2020 CERN.
 * SPDX-License-Identifier: MIT
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
