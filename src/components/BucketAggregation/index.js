/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '@app/store';
import { updateQueryAggregation } from '@app/state/actions';
import BucketAggregationComponent from './BucketAggregation';

const mapDispatchToProps = dispatch => ({
  updateQueryAggregation: aggregation =>
    dispatch(updateQueryAggregation(aggregation)),
});

export const BucketAggregation = connect(
  state => ({
    userSelectionAggregations: state.query.aggregations,
    resultsAggregations: state.results.data.aggregations,
  }),
  mapDispatchToProps
)(BucketAggregationComponent);
