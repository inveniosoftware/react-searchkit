/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { ShouldRender } from '../ShouldRender';

export default class Sort extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.updateQuerySorting = props.updateQuerySorting;
    this.setInitialState = props.setInitialState;
    this.renderElement = props.renderElement || this._renderElement;

    this.options.forEach(
      option =>
        (option['value'] = this._computeValue(option.sortBy, option.sortOrder))
    );

    // compute default value for sort field and sort order
    const defaultValue = this.options.find(
      option => 'default' in option && option.default
    );
    this.defaultValue = {
      sortBy: defaultValue.sortBy || this.options[0].sortBy,
      sortOrder: defaultValue.sortOrder || this.options[0].sortOrder,
    };

    const defaultValueOnEmptyString = this.options.find(
      option => 'defaultOnEmptyString' in option && option.defaultOnEmptyString
    );
    this.defaultValueOnEmptyString = {
      sortBy: defaultValueOnEmptyString.sortBy || this.options[0].sortBy,
      sortOrder:
        defaultValueOnEmptyString.sortOrder || this.options[0].sortOrder,
    };
  }

  componentDidMount() {
    if (
      this.props.currentSortBy === null &&
      this.props.currentSortOrder === null
    ) {
      const defaultValue = this.props.currentQueryString
        ? this.defaultValue
        : this.defaultValueOnEmptyString;
      this.setInitialState({
        sortBy: defaultValue.sortBy,
        sortOrder: defaultValue.sortOrder,
      });
    }
  }

  _computeValue = (sortBy, sortOrder) => {
    return `${sortBy}-${sortOrder}`;
  };

  _renderElement = (
    currentSortBy,
    currentSortOrder,
    options,
    onValueChange
  ) => {
    const selected = this._computeValue(currentSortBy, currentSortOrder);
    const _options = options.map((element, index) => {
      return {
        key: index,
        text: element.text,
        value: element.value,
      };
    });
    return (
      <Dropdown
        selection
        compact
        options={_options}
        value={selected}
        onChange={(e, { value }) => onValueChange(value)}
      />
    );
  };

  onChange = value => {
    if (
      value ===
      this._computeValue(this.props.currentSortBy, this.props.currentSortOrder)
    )
      return;
    const selected = this.options.find(option => option.value === value);
    this.updateQuerySorting(selected.sortBy, selected.sortOrder);
  };

  render() {
    const {
      currentSortBy,
      currentSortOrder,
      loading,
      totalResults,
    } = this.props;
    return (
      <ShouldRender
        condition={
          currentSortBy !== null &&
          currentSortOrder !== null &&
          !loading &&
          totalResults > 1
        }
      >
        {this.renderElement(
          currentSortBy,
          currentSortOrder,
          this.options,
          this.onChange
        )}
      </ShouldRender>
    );
  }
}

Sort.propTypes = {
  values: PropTypes.array.isRequired,
  currentSortBy: PropTypes.string,
  currentSortOrder: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  updateQuerySorting: PropTypes.func.isRequired,
  setInitialState: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

Sort.defaultProps = {
  currentSortBy: null,
  currentSortOrder: null,
  renderElement: null,
};
