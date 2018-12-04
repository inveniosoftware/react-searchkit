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
  }

  onUserSelectionChange = aggregation => {
    this.updateQueryAggregation(aggregation);
  };

  _renderElement = (
    title,
    field,
    resultsAggregations,
    userSelectionAggregations,
    userSelectionChangeHandler
  ) => {
    // user selection for this specific aggregator
    const userSelection = userSelectionAggregations.filter(
      selectedAggr => field in selectedAggr
    );

    return resultsAggregations.length ? (
      <Card>
        <Card.Content header={title} />
        <Card.Content>
          <AggregatorValues
            field={field}
            values={resultsAggregations}
            userSelection={userSelection}
            onUserSelectionChange={userSelectionChangeHandler}
          />
        </Card.Content>
      </Card>
    ) : null;
  };

  render() {
    const { userSelectionAggregations, resultsAggregations } = this.props;
    const current = userSelectionAggregations || [];
    const results = resultsAggregations[this.field] || [];
    return (
      <div>
        {this.renderElement(
          this.title,
          this.field,
          results,
          current,
          this.onUserSelectionChange
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
