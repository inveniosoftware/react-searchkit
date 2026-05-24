/*
 * SPDX-FileCopyrightText: 2019-2020 CERN.
 * SPDX-License-Identifier: MIT
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
