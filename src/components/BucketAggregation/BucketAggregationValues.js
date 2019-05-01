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
import _find from 'lodash/find';
import _isPlainObject from 'lodash/isPlainObject';
import _capitalize from 'lodash/capitalize';

export default class BucketAggregationValues extends Component {
  constructor(props) {
    super(props);
    this.agg = props.agg;
    this.onUserSelectionChange = props.onUserSelectionChange;
    this.renderElement = props.renderElement || this._renderElement;
  }

  buildAggValues = (agg, buckets, userSelection) => {
    return Object.keys(buckets)
      .filter(key => _isPlainObject(buckets[key]))
      .map((key, index) => {
        const bucket = buckets[key];
        const checked = this.isItemChecked(
          agg.field,
          bucket.value,
          userSelection
        );
        const _onUserSelectionChange = () => {
          const fieldValueMap = {};
          fieldValueMap[fieldName] = { value: bucket.key };
          this.onUserSelectionChange(fieldValueMap);
        };

        const label = `${_capitalize(bucket.value)} (${bucket.total})`;

        const checkboxCmp = (
          <Checkbox
            label={label}
            value={bucket.key}
            checked={checked}
            onClick={_onUserSelectionChange}
          />
        );

        let nestedAgg;
        if (bucket.hasNestedAgg) {
          nestedAgg = (
            <List>{this.buildAggValues(agg.aggs, bucket, userSelection)}</List>
          );
        }

        return (
          <List.Item key={index}>
            {checkboxCmp}
            {nestedAgg}
          </List.Item>
        );
      });
  };

  isItemChecked = (fieldName, value, userSelection) => {
    const selectedFieldFound = _find(userSelection, userSelectedAggr => {
      return (
        fieldName in userSelectedAggr && // check if this field in user selection
        userSelectedAggr[fieldName].value === value && // check if field value corresponds to this aggregation value
        Object.keys(userSelectedAggr[fieldName]).length === 1 // check if it has not nested user selections
      );
    });
    return selectedFieldFound ? true : false;
  };

  render() {
    const buckets = this.props.buckets;
    const userSelection = this.props.userSelection;

    const valuesCmps = this.buildAggValues(this.agg, buckets, userSelection);

    return <List>{valuesCmps}</List>;
  }
}

BucketAggregationValues.propTypes = {
  agg: PropTypes.shape({
    name: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    aggs: PropTypes.object,
  }),
  buckets: PropTypes.object.isRequired,
  userSelection: PropTypes.array.isRequired,
  onUserSelectionChange: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

BucketAggregationValues.defaultProps = {
  renderElement: null,
};
