/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
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
