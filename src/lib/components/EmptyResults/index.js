/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import { resetQuery } from "../../state/actions";
import EmptyResultsComponent from "./EmptyResults";

const mapDispatchToProps = (dispatch) => ({
  resetQuery: () => dispatch(resetQuery()),
});
export const EmptyResults = connect(
  (state) => ({
    loading: state.results.loading,
    totalResults: state.results.data.total,
    error: state.results.error,
    queryString: state.query.queryString,
    userSelectionFilters: state.query.filters,
  }),
  mapDispatchToProps
)(EmptyResultsComponent);
