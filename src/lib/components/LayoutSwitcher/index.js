/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from "react-redux";
import { updateResultsLayout } from "../../state/actions";
import LayoutSwitcherComponent from "./LayoutSwitcher";

const mapDispatchToProps = (dispatch) => ({
  updateLayout: (layout) => dispatch(updateResultsLayout(layout)),
});
export const LayoutSwitcher = connect(
  (state) => ({
    loading: state.results.loading,
    currentLayout: state.query.layout,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(LayoutSwitcherComponent);
