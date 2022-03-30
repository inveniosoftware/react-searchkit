/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
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
