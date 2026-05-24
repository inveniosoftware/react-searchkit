/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import { updateQuerySortBy } from "../../state/actions";
import SortByComponent from "./SortBy";

const mapDispatchToProps = (dispatch) => ({
  updateQuerySortBy: (sortByValue) => dispatch(updateQuerySortBy(sortByValue)),
});

export const SortBy = connect(
  (state) => ({
    loading: state.results.loading,
    totalResults: state.results.data.total,
    currentSortBy: state.query.sortBy,
  }),
  mapDispatchToProps
)(SortByComponent);
