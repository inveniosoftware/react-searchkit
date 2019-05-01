/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { _isPlainObject } from 'lodash/isPlainObject';
import BucketAggregationValues from './BucketAggregationValues';

export default class BucketAggregation extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.agg = props.agg;
    this.updateQueryAggregation = props.updateQueryAggregation;
    this.renderElement = props.renderElement || this._renderElement;
    this.customProps = props.customProps;
  }

  onUserSelectionChange = aggregation => {
    this.updateQueryAggregation(aggregation);
  };

  _renderElement = (title, buckets, aggregations, customProps) => {
    return _isPlainObject(buckets) ? (
      <Card>
        <Card.Content header={title} />
        <Card.Content>{aggregations}</Card.Content>
      </Card>
    ) : null;
  };

  render() {
    const { userSelectionAggregations, resultsAggregations } = this.props;
    const current = userSelectionAggregations || [];
    const buckets = resultsAggregations[this.agg.name] || {};

    // user selection for the field of this bucket aggregation
    const userSelection = current.filter(
      selectedAggr => this.agg.field in selectedAggr
    );

    const aggregations = (
      <BucketAggregationValues
        agg={this.agg}
        buckets={buckets}
        userSelection={userSelection}
        onUserSelectionChange={this.onUserSelectionChange}
      />
    );

    return (
      <div>
        {this.renderElement(
          this.title,
          buckets,
          aggregations,
          this.customProps
        )}
      </div>
    );
  }
}

BucketAggregation.propTypes = {
  title: PropTypes.string.isRequired,
  agg: PropTypes.shape({
    name: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    aggs: PropTypes.object,
  }),
  userSelectionAggregations: PropTypes.array.isRequired,
  resultsAggregations: PropTypes.object.isRequired,
  updateQueryAggregation: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

BucketAggregation.defaultProps = {
  renderElement: null,
};
