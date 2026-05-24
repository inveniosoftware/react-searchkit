/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import { updateQueryFilters } from "../../state/actions";
import ToggleComponent from "./Toggle";

const mapDispatchToProps = (dispatch) => ({
  updateQueryFilters: (filter) => dispatch(updateQueryFilters(filter)),
});

export const Toggle = connect(
  (state) => ({
    userSelectionFilters: state.query.filters,
  }),
  mapDispatchToProps
)(ToggleComponent);
