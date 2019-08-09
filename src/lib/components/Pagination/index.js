/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '../../store';
import {
  updateQueryPaginationPage,
  setInitialState,
} from '../../state/actions';
import PaginationComponent from './Pagination';

const mapDispatchToProps = dispatch => ({
  updateQueryPage: page => dispatch(updateQueryPaginationPage(page)),
  setInitialState: value => dispatch(setInitialState(value)),
});

export const Pagination = connect(
  state => ({
    currentPage: state.query.page,
    currentSize: state.query.size,
    loading: state.results.loading,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(PaginationComponent);
