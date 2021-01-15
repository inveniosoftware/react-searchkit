/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Checkbox, List } from 'semantic-ui-react';
import { buildUID } from '../../util';

class BucketAggregationValues extends Component {
  constructor(props) {
    super(props);
    this.field = props.field;
    this.aggName = props.aggName;
    this.childAgg = props.childAgg;
    this.onFilterClicked = props.onFilterClicked;
  }

  _isSelected = (aggName, value, selectedFilters) => {
    // return True there is at least one filter that has this value
    return (
      selectedFilters.filter(
        (filter) => filter[0] === aggName && filter[1] === value
      ).length >= 1
    );
  };

  getChildAggCmps = (bucket, selectedFilters) => {
    const hasChildAggregation =
      this.childAgg && this.childAgg['aggName'] in bucket;
    let selectedChildFilters = [];
    if (hasChildAggregation) {
      const childBuckets = bucket[this.childAgg['aggName']]['buckets'];
      selectedFilters.forEach((filter) => {
        const isThisAggregation = filter[0] === this.aggName;
        const isThisValue = filter[1] === bucket.key;
        const hasChild = filter.length === 3;
        if (isThisAggregation && isThisValue && hasChild) {
          selectedChildFilters.push(filter[2]);
        }
      });
      const onFilterClicked = (value) => {
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
        />
      );
    }
    return null;
  };

  render() {
    const { buckets, selectedFilters, overridableId } = this.props;
    const valuesCmp = buckets.map((bucket) => {
      const keyField = bucket.key_as_string ? bucket.key_as_string : bucket.key;
      const isSelected = this._isSelected(
        this.aggName,
        keyField,
        selectedFilters
      );
      const onFilterClicked = (value) => {
        this.onFilterClicked([this.aggName, value]);
      };
      const getChildAggCmps = (bucket) =>
        this.getChildAggCmps(bucket, selectedFilters);

      return (
        <ValueElement
          key={bucket.key}
          bucket={bucket}
          keyField={keyField}
          isSelected={isSelected}
          onFilterClicked={onFilterClicked}
          getChildAggCmps={getChildAggCmps}
          overridableId={overridableId}
        />
      );
    });
    return (
      <ContainerElement valuesCmp={valuesCmp} overridableId={overridableId} />
    );
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
  overridableId: PropTypes.string,
};

BucketAggregationValues.defaultProps = {
  overridableId: '',
};

const ValueElement = (props) => {
  const {
    bucket,
    isSelected,
    onFilterClicked,
    getChildAggCmps,
    overridableId,
    keyField,
  } = props;
  const label = bucket.label
    ? bucket.label
    : `${keyField} (${bucket.doc_count.toLocaleString('en-US')})`;
  const childAggCmps = getChildAggCmps(bucket);
  return (
    <Overridable
      id={buildUID('BucketAggregationValues.element', overridableId)}
      {...props}
    >
      <List.Item key={bucket.key}>
        <Checkbox
          label={label}
          value={bucket.key}
          onClick={() => onFilterClicked(bucket.key)}
          checked={isSelected}
        />
        {childAggCmps}
      </List.Item>
    </Overridable>
  );
};

const ContainerElement = ({ valuesCmp, overridableId }) => {
  return (
    <Overridable
      id={buildUID('BucketAggregationContainer.element', overridableId)}
      valuesCmp={valuesCmp}
    >
      <List>{valuesCmp}</List>
    </Overridable>
  );
};

export default Overridable.component(
  'BucketAggregationValues',
  BucketAggregationValues
);
