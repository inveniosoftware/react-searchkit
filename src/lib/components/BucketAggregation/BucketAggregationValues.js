/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, List } from 'semantic-ui-react';

export default class BucketAggregationValues extends Component {
  constructor(props) {
    super(props);
    this.field = props.field;
    this.aggName = props.aggName;
    this.childAgg = props.childAgg;
    this.onFilterClicked = props.onFilterClicked;
    this.renderContainerElement =
      props.renderContainerElement || this._renderContainerElement;
    this.renderValueElement =
      props.renderValueElement || this._renderValueElement;
  }

  _isSelected = (aggName, value, selectedFilters) => {
    // return True there is at least one filter that has this value
    return (
      selectedFilters.filter(
        filter => filter[0] === aggName && filter[1] === value
      ).length >= 1
    );
  };

  getChildAggCmps = (bucket, selectedFilters) => {
    const hasChildAggregation =
      this.childAgg && this.childAgg['aggName'] in bucket;
    let selectedChildFilters = [];
    if (hasChildAggregation) {
      const childBuckets = bucket[this.childAgg['aggName']]['buckets'];
      selectedFilters.forEach(filter => {
        const isThisAggregation = filter[0] === this.aggName;
        const isThisValue = filter[1] === bucket.key;
        const hasChild = filter.length === 3;
        if (isThisAggregation && isThisValue && hasChild) {
          selectedChildFilters.push(filter[2]);
        }
      });
      const onFilterClicked = value => {
        this.onFilterClicked([this.aggName, bucket.key, value]);
      };
      return (
        <BucketAggregationValues
          buckets={childBuckets}
          selectedFilters={selectedChildFilters}
          field={this.childAgg.field}
          aggName={this.childAgg.aggName}
          childAgg={this.childAgg.childAgg}
          onFilterClicked={onFilterClicked}
          renderContainerElement={this.renderContainerElement}
          renderValueElement={this.renderValueElement}
        />
      );
    }
    return null;
  };

  _renderValueElement = (
    bucket,
    isSelected,
    onFilterClicked,
    getChildAggCmps
  ) => {
    const label = `${bucket.key} (${bucket.doc_count})`;
    const childAggCmps = getChildAggCmps(bucket);
    return (
      <List.Item key={bucket.key}>
        <Checkbox
          label={label}
          value={bucket.key}
          onClick={() => onFilterClicked(bucket.key)}
          checked={isSelected}
        />
        {childAggCmps}
      </List.Item>
    );
  };

  _renderContainerElement = valuesCmp => <List>{valuesCmp}</List>;

  render() {
    const { buckets, selectedFilters } = this.props;

    const valuesCmp = buckets.map(bucket => {
      const isSelected = this._isSelected(
        this.aggName,
        bucket.key,
        selectedFilters
      );
      const onFilterClicked = value => {
        this.onFilterClicked([this.aggName, value]);
      };
      const getChildAggCmps = bucket =>
        this.getChildAggCmps(bucket, selectedFilters);
      return this.renderValueElement(
        bucket,
        isSelected,
        onFilterClicked,
        getChildAggCmps
      );
    });
    return this.renderContainerElement(valuesCmp);
  }
}

BucketAggregationValues.propTypes = {
  buckets: PropTypes.array.isRequired,
  selectedFilters: PropTypes.array.isRequired,
  field: PropTypes.string.isRequired,
  aggName: PropTypes.string.isRequired,
  childAgg: PropTypes.shape({
    field: PropTypes.string.isRequired,
    aggName: PropTypes.string.isRequired,
    childAgg: PropTypes.object,
  }),
  onFilterClicked: PropTypes.func.isRequired,
  renderContainerElement: PropTypes.func,
  renderValueElement: PropTypes.func,
};

BucketAggregationValues.defaultProps = {
  renderContainerElement: null,
  renderValueElement: null,
};
