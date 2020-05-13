/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import _get from 'lodash/get';
import Overridable from 'react-overridable';
import BucketAggregationValues from './BucketAggregationValues';
import { buildUID } from '../../util';

class BucketAggregation extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.agg = props.agg;
    this.updateQueryFilters = props.updateQueryFilters;
  }

  onFilterClicked = (filter) => {
    this.updateQueryFilters(filter);
  };

  _renderValues = (resultBuckets, selectedFilters) => {
    const { overridableId } = this.props;
    return (
      <BucketAggregationValues
        buckets={resultBuckets}
        selectedFilters={selectedFilters}
        field={this.agg.field}
        aggName={this.agg.aggName}
        childAgg={this.agg.childAgg}
        onFilterClicked={this.onFilterClicked}
        overridableId={overridableId}
      />
    );
  };

  _getSelectedFilters = (userSelectionFilters) => {
    // get selected filters for this field only
    return userSelectionFilters.filter(
      (filter) => filter[0] === this.agg.aggName
    );
  };

  _getResultBuckets = (resultsAggregations) => {
    // get buckets of this field
    const thisAggs = _get(resultsAggregations, this.agg.aggName, {});
    return 'buckets' in thisAggs ? thisAggs['buckets'] : [];
  };

  render() {
    const {
      userSelectionFilters,
      resultsAggregations,
      overridableId,
    } = this.props;
    const selectedFilters = this._getSelectedFilters(userSelectionFilters);
    const resultBuckets = this._getResultBuckets(resultsAggregations);
    const valuesCmp = resultBuckets.length
      ? this._renderValues(resultBuckets, selectedFilters)
      : null;
    return (
      <Element
        title={this.title}
        containerCmp={valuesCmp}
        overridableId={overridableId}
      />
    );
  }
}

BucketAggregation.propTypes = {
  title: PropTypes.string.isRequired,
  agg: PropTypes.shape({
    field: PropTypes.string.isRequired,
    aggName: PropTypes.string.isRequired,
    childAgg: PropTypes.object,
  }),
  userSelectionFilters: PropTypes.array.isRequired,
  resultsAggregations: PropTypes.object.isRequired,
  updateQueryFilters: PropTypes.func.isRequired,
  renderValuesContainerElement: PropTypes.func,
  renderValueElement: PropTypes.func,
  overridableId: PropTypes.string,
};

BucketAggregation.defaultProps = {
  renderValuesContainerElement: null,
  renderValueElement: null,
  overridableId: '',
};

const Element = ({ overridableId, ...props }) => {
  const { title, containerCmp } = props;
  return (
    containerCmp && (
      <Overridable
        id={buildUID('BucketAggregation.element', overridableId)}
        {...props}
      >
        <Card>
          <Card.Content>
            <Card.Header>{title}</Card.Header>
          </Card.Content>
          <Card.Content>{containerCmp}</Card.Content>
        </Card>
      </Overridable>
    )
  );
};

export default Overridable.component('BucketAggregation', BucketAggregation);
