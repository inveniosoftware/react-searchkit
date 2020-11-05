/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from 'react-redux';
import { updateQueryPaginationSize } from '../../state/actions';
import ResultsPerPageComponent from './ResultsPerPage';

const mapDispatchToProps = (dispatch) => ({
  updateQuerySize: (size) => dispatch(updateQueryPaginationSize(size)),
});

export const ResultsPerPage = connect(
  (state) => ({
    loading: state.results.loading,
    currentSize: state.query.size,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(ResultsPerPageComponent);
