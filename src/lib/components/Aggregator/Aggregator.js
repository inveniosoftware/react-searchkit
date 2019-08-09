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
import AggregatorValues from './AggregatorValues';

export default class Aggregator extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.field = props.field;
    this.updateQueryAggregation = props.updateQueryAggregation;
    this.renderElement = props.renderElement || this._renderElement;
    this.customProps = props.customProps;
  }

  onUserSelectionChange = aggregation => {
    this.updateQueryAggregation(aggregation);
  };

  _renderElement = (title, resultsAggregations, aggregations, customProps) => {
    return resultsAggregations !== undefined ? (
      <Card>
        <Card.Content header={title} />
        <Card.Content>{aggregations}</Card.Content>
      </Card>
    ) : null;
  };

  render() {
    const { userSelectionAggregations, resultsAggregations } = this.props;
    const current = userSelectionAggregations || [];
    const results = resultsAggregations[this.field] || {};

    // user selection for this specific aggregator
    const userSelection = current.filter(
      selectedAggr => this.field in selectedAggr
    );

    const aggregations = (
      <AggregatorValues
        field={this.field}
        values={results}
        userSelection={userSelection}
        onUserSelectionChange={this.onUserSelectionChange}
      />
    );

    return (
      <div>
        {this.renderElement(
          this.title,
          results,
          aggregations,
          this.customProps
        )}
      </div>
    );
  }
}

Aggregator.propTypes = {
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  userSelectionAggregations: PropTypes.array.isRequired,
  resultsAggregations: PropTypes.object.isRequired,
  updateQueryAggregation: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

Aggregator.defaultProps = {
  renderElement: null,
};
