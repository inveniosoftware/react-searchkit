/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '../../store';
import { resetQuery } from '../../state/actions';
import EmptyResultsComponent from './EmptyResults';

const mapDispatchToProps = dispatch => ({
  resetQuery: () => dispatch(resetQuery()),
});
export const EmptyResults = connect(
  state => ({
    loading: state.results.loading,
    totalResults: state.results.data.total,
    error: state.results.error,
    queryString: state.query.queryString,
  }),
  mapDispatchToProps
)(EmptyResultsComponent);
