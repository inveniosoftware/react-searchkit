/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '../../store';
import { updateQueryAggregation } from '../../state/actions';
import ActiveAggregationsComponent from './ActiveAggregations';

const mapDispatchToProps = dispatch => ({
  updateQueryAggregation: path => dispatch(updateQueryAggregation(path)),
});

export const ActiveAggregations = connect(
  state => ({
    aggregations: state.query.aggregations,
  }),
  mapDispatchToProps
)(ActiveAggregationsComponent);
