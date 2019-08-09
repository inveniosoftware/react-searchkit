/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Icon } from 'semantic-ui-react';

export default class ActiveAggregations extends Component {
  constructor(props) {
    super(props);
    this.updateQueryAggregation = props.updateQueryAggregation;
    this.renderElement = props.renderElement || this._renderElement;
    this.renderSelectedAggregation = props.renderSelectedAggregation || this._renderSelectedAggregation;
  }

  _getNestedActiveAggregation = (fieldName, aggrValue, aggregationIndex) => {
    const keys = Object.keys(aggrValue).filter(key => key !== 'value');
    if (keys.length === 1) {
      const nestedKey = keys[0];
      return this._getNestedActiveAggregation(
        nestedKey,
        aggrValue[nestedKey],
        aggregationIndex
      );
    } else {
      const selectionLabel = aggrValue['value'].split('.').join(':');
      return {
        label: `${selectionLabel}`,
        aggregationIndex: aggregationIndex,
      };
    }
  };

  _getActiveAggregations = aggregations => {
    return aggregations.map((aggregation, aggregationIndex) => {
      const rootKey = Object.keys(aggregation)[0];
      return this._getNestedActiveAggregation(
        rootKey,
        aggregation[rootKey],
        aggregationIndex
      );
    });
  };

  _onClick = (event, position) => {
    const stateQueryAggregation = this.props.aggregations[position];
    this.updateQueryAggregation(stateQueryAggregation);
  };

  _renderSelectedAggregation = (label, key, removeAggregationClickHandler) => {
    return (
      <Label key={key}>
        {label} <Icon name="close" onClick={removeAggregationClickHandler} />
      </Label>
    );
  };

  _renderElement = aggregations => {
    const indexedLabels = this._getActiveAggregations(aggregations);
    indexedLabels.sort((first, second) => first['label'] < second['label']);
    const sortedLabels = indexedLabels.map(indexedLabel => {
      const value = indexedLabel['label'];
      const key = indexedLabel['aggregationIndex'];
      const removeAggregationClickHandler = (event, input) => {
        this._onClick(event, key);
      };
      return this.renderSelectedAggregation(
        value,
        key,
        removeAggregationClickHandler
      );
    });
    return sortedLabels.length ? sortedLabels : null;
  };

  render() {
    const aggregations = this.props.aggregations;
    return this.renderElement(aggregations);
  }
}

ActiveAggregations.propTypes = {
  aggregations: PropTypes.array.isRequired,
  updateQueryAggregation: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

ActiveAggregations.defaultProps = {};
