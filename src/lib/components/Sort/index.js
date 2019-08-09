/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '../../store';
import { updateQuerySorting, setInitialState } from '../../state/actions';
import SortComponent from './Sort';

const mapDispatchToProps = dispatch => ({
  updateQuerySorting: (sortBy, sortOrder) =>
    dispatch(updateQuerySorting(sortBy, sortOrder)),
  setInitialState: value => dispatch(setInitialState(value)),
});

export const Sort = connect(
  state => ({
    currentQueryString: state.query.queryString,
    currentSortBy: state.query.sortBy,
    currentSortOrder: state.query.sortOrder,
    loading: state.results.loading,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(SortComponent);
