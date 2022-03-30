/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
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
