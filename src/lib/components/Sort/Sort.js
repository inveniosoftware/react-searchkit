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
import Overridable from 'react-overridable';
import { ShouldRender } from '../ShouldRender';
import { buildUID } from '../../util';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.updateQuerySorting = props.updateQuerySorting;
    this.setInitialState = props.setInitialState;

    this.options.forEach(
      (option) =>
        (option['value'] = this._computeValue(option.sortBy, option.sortOrder))
    );

    // compute default value for sort field and sort order
    const defaultValue = this.options.find(
      (option) => 'default' in option && option.default
    );
    this.defaultValue = {
      sortBy: defaultValue.sortBy || this.options[0].sortBy,
      sortOrder: defaultValue.sortOrder || this.options[0].sortOrder,
    };

    const defaultValueOnEmptyString = this.options.find(
      (option) =>
        'defaultOnEmptyString' in option && option.defaultOnEmptyString
    );
    this.defaultValueOnEmptyString = {
      sortBy: defaultValueOnEmptyString
        ? defaultValueOnEmptyString.sortBy
        : this.options[0].sortBy,
      sortOrder: defaultValueOnEmptyString
        ? defaultValueOnEmptyString.sortOrder
        : this.options[0].sortOrder,
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

  onChange = (value) => {
    if (
      value ===
      this._computeValue(this.props.currentSortBy, this.props.currentSortOrder)
    )
      return;
    const selected = this.options.find((option) => option.value === value);
    this.updateQuerySorting(selected.sortBy, selected.sortOrder);
  };

  render() {
    const {
      currentSortBy,
      currentSortOrder,
      loading,
      totalResults,
      label,
      overridableUID,
    } = this.props;
    return (
      <ShouldRender
        condition={
          currentSortBy !== null &&
          currentSortOrder !== null &&
          !loading &&
          totalResults > 0
        }
      >
        {label(
          <Element
            currentSortBy={currentSortBy}
            currentSortOrder={currentSortOrder}
            options={this.options}
            onValueChange={this.onChange}
            computeValue={this._computeValue}
            overridableUID={overridableUID}
          />
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
  label: PropTypes.func,
  overridableUID: PropTypes.string,
};

Sort.defaultProps = {
  currentSortBy: null,
  currentSortOrder: null,
  label: (cmp) => cmp,
  overridableUID: '',
};

const Element = ({ overridableUID, ...props }) => {
  const {
    currentSortBy,
    currentSortOrder,
    options,
    onValueChange,
    computeValue,
  } = props;
  const selected = computeValue(currentSortBy, currentSortOrder);
  const _options = options.map((element, index) => {
    return {
      key: index,
      text: element.text,
      value: element.value,
    };
  });
  return (
    <Overridable id={buildUID('Sort.element', overridableUID)} {...props}>
      <Dropdown
        selection
        compact
        options={_options}
        value={selected}
        onChange={(e, { value }) => onValueChange(value)}
      />
    </Overridable>
  );
};

export default Overridable.component('Sort', Sort);
