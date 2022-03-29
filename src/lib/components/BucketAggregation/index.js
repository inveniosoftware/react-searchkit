/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from "react-redux";
import { updateQueryFilters } from "../../state/actions";
import BucketAggregationComponent from "./BucketAggregation";

const mapDispatchToProps = (dispatch) => ({
  updateQueryFilters: (filter) => dispatch(updateQueryFilters(filter)),
});

export const BucketAggregation = connect(
  (state) => ({
    userSelectionFilters: state.query.filters,
    resultsAggregations: state.results.data.aggregations,
  }),
  mapDispatchToProps
)(BucketAggregationComponent);
