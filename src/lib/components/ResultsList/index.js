/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '../../store';
import ResultsListComponent from './ResultsList';

export const ResultsList = connect(state => ({
  loading: state.results.loading,
  totalResults: state.results.data.total,
  results: state.results.data.hits,
}))(ResultsListComponent);
