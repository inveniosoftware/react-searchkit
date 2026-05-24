/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import { updateQuerySortOrder } from "../../state/actions";
import SortOrderComponent from "./SortOrder";

const mapDispatchToProps = (dispatch) => ({
  updateQuerySortOrder: (sortOrderValue) =>
    dispatch(updateQuerySortOrder(sortOrderValue)),
});

export const SortOrder = connect(
  (state) => ({
    loading: state.results.loading,
    totalResults: state.results.data.total,
    currentSortOrder: state.query.sortOrder,
  }),
  mapDispatchToProps
)(SortOrderComponent);
