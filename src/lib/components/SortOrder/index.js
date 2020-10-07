/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '../../store';
import { updateQuerySortOrder } from '../../state/actions';
import SortOrderComponent from './SortOrder';

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
