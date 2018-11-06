import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Icon } from 'semantic-ui-react';

export default class ActiveAggregations extends Component {
  constructor(props) {
    super(props);
    this.updateQueryAggregation = props.updateQueryAggregation;
    this.renderElement = props.renderElement || this._renderElement;
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
      const value = aggrValue['value'];
      return {
        label: `${fieldName}: ${value}`,
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

  _renderSelectedAggregations = aggregations => {
    const indexedLabels = this._getActiveAggregations(aggregations);
    indexedLabels.sort((first, second) => first['label'] < second['label']);
    const sortedLabels = indexedLabels.map(indexedLabel => {
      const value = indexedLabel['label'];
      const key = indexedLabel['aggregationIndex'];
      const removeAggregationClickHandler = (event, input) => {
        this._onClick(event, key);
      };
      return this.renderElement(value, key, removeAggregationClickHandler);
    });
    return sortedLabels.length ? sortedLabels : null;
  };

  _renderElement = (label, key, removeAggregationClickHandler) => {
    return (
      <Label key={key}>
        {label} <Icon name="close" onClick={removeAggregationClickHandler} />
      </Label>
    );
  };

  render() {
    const aggregations = this.props.aggregations;
    return this._renderSelectedAggregations(aggregations);
  }
}

ActiveAggregations.propTypes = {
  aggregations: PropTypes.array.isRequired,
  updateQueryAggregation: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

ActiveAggregations.defaultProps = {};
