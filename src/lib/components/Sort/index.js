/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import { updateQuerySorting } from "../../state/actions";
import SortComponent from "./Sort";

const mapDispatchToProps = (dispatch) => ({
  updateQuerySorting: (sortBy, sortOrder) =>
    dispatch(updateQuerySorting(sortBy, sortOrder)),
});

export const Sort = connect(
  (state) => ({
    currentSortBy: state.query.sortBy,
    currentSortOrder: state.query.sortOrder,
    loading: state.results.loading,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(SortComponent);
