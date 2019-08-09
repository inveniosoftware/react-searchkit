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
import _capitalize from 'lodash/capitalize';

export default class AggregatorValues extends Component {
  constructor(props) {
    super(props);
    this.field = props.field;
    this.onUserSelectionChange = props.onUserSelectionChange;
    this.renderElement = props.renderElement || this._renderElement;
  }

  buildAggregations = (fieldName, values, userSelection) => {
    const parentNestedField = values.hasNestedField;

    return Object.keys(values).map((key, index) => {
      if (typeof values[key] === 'object') {
        const aggrValue = values[key];
        const checked = this.isItemChecked(fieldName, aggrValue, userSelection);
        const _onUserSelectionChange = (e, { value }) => {
          const aggrNameValue = {};
          aggrNameValue[fieldName] = { value: aggrValue.key };
          this.onUserSelectionChange(aggrNameValue);
        };

        const label = `${_capitalize(aggrValue.name)} (${aggrValue.total})`;

        const checkboxItem = (
          <Checkbox
            label={label}
            value={aggrValue.key}
            checked={checked}
            onClick={_onUserSelectionChange}
          />
        );

        let nestedAgg;
        if (values[key].hasNestedField) {
          nestedAgg = (
            <List>
              {this.buildAggregations(fieldName, values[key], userSelection)}
            </List>
          );
        }

        return (
          <List.Item key={index}>
            {checkboxItem}
            {nestedAgg}
          </List.Item>
        );
      }
    });
  };

  isItemChecked = (fieldName, aggrValue, userSelection) => {
    const selectedFieldFound = _find(userSelection, userSelectedAggr => {
      return (
        fieldName in userSelectedAggr && // check if this field in user selection
        userSelectedAggr[fieldName].value === aggrValue.key && // check if field value corresponds to this aggregation value
        Object.keys(userSelectedAggr[fieldName]).length === 1 // check if it has not nested user selections
      );
    });
    return selectedFieldFound ? true : false;
  };

  render() {
    const values = this.props.values;
    const userSelection = this.props.userSelection;

    const allAgggregations = this.buildAggregations(
      this.field,
      values,
      userSelection
    );

    return <List>{allAgggregations}</List>;
  }
}

AggregatorValues.propTypes = {
  field: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  userSelection: PropTypes.array.isRequired,
  onUserSelectionChange: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

AggregatorValues.defaultProps = {
  renderElement: null,
};
