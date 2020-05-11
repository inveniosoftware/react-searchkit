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
import { Overridable } from 'react-overridable';
import { ShouldRender } from '../ShouldRender';

export default class SortBy extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.defaultValue = this.props.defaultValue;
    this.defaultValueOnEmptyString = this.props.defaultValueOnEmptyString;
    this.updateQuerySortBy = props.updateQuerySortBy;
    this.setInitialState = props.setInitialState;
  }

  componentDidMount() {
    if (this.props.currentSortBy === null) {
      const sortBy = this.props.currentQueryString
        ? this.defaultValue
        : this.defaultValueOnEmptyString || this.defaultValue;
      this.setInitialState({
        sortBy: sortBy,
      });
    }
  }

  onChange = (value) => {
    if (value === this.props.currentSortBy) return;
    this.updateQuerySortBy(value);
  };

  render() {
    const { currentSortBy, loading, totalResults, label } = this.props;
    return (
      <ShouldRender
        condition={currentSortBy !== null && !loading && totalResults > 0}
      >
        {label(
          <Element
            currentSortBy={currentSortBy}
            options={this.options}
            onValueChange={this.onChange}
          />
        )}
      </ShouldRender>
    );
  }
}

SortBy.propTypes = {
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
  defaultValueOnEmptyString: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  currentSortBy: PropTypes.string,
  currentQueryString: PropTypes.string.isRequired,
  updateQuerySortBy: PropTypes.func.isRequired,
  setInitialState: PropTypes.func.isRequired,
  label: PropTypes.func,
};

SortBy.defaultProps = {
  defaultValueOnEmptyString: null,
  currentSortBy: null,
  label: (cmp) => cmp,
};

const Element = (props) => {
  const { currentSortBy, options, onValueChange } = props;
  const _options = options.map((element, index) => {
    return { key: index, text: element.text, value: element.value };
  });
  return (
    <Overridable id="SortBy.element" {...props}>
      <Dropdown
        selection
        compact
        options={_options}
        value={currentSortBy}
        onChange={(e, { value }) => onValueChange(value)}
      />
    </Overridable>
  );
};
