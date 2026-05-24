/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import { updateQueryFilters } from "../../state/actions";
import ActiveFiltersComponent from "./ActiveFilters";

const mapDispatchToProps = (dispatch) => ({
  updateQueryFilters: (filter) => dispatch(updateQueryFilters(filter)),
});

export const ActiveFilters = connect(
  (state) => ({
    filters: state.query.filters,
  }),
  mapDispatchToProps
)(ActiveFiltersComponent);
