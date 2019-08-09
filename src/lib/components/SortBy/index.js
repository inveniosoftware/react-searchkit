/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '../../store';
import { updateQuerySortBy, setInitialState } from '../../state/actions';
import SortByComponent from './SortBy';
const mapDispatchToProps = dispatch => ({
  updateQuerySortBy: sortByValue => dispatch(updateQuerySortBy(sortByValue)),
  setInitialState: value => dispatch(setInitialState(value)),
});

export const SortBy = connect(
  state => ({
    loading: state.results.loading,
    totalResults: state.results.data.total,
    currentSortBy: state.query.sortBy,
    currentQueryString: state.query.queryString,
  }),
  mapDispatchToProps
)(SortByComponent);
