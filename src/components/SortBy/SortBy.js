/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import _find from 'lodash/find';
import { ShouldRender } from '@app/components/ShouldRender';

export default class SortBy extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.defaultValue = this.props.defaultValue;
    this.updateQuerySortBy = props.updateQuerySortBy;
    this.setInitialState = props.setInitialState;
    this.renderElement = props.renderElement || this._renderElement;
  }

  componentWillMount() {
    this.setInitialState({
      sortBy: this.defaultValue,
    });
  }

  _renderElement(currentSortBy, values, onValueChange) {
    const onChange = (event, { value }) => {
      onValueChange(value);
    };
    return (
      <Dropdown
        selection
        compact
        options={this._mapOptions(values)}
        value={currentSortBy}
        onChange={onChange}
      />
    );
  }

  _mapOptions = options => {
    return options.map((element, index) => {
      return { key: index, text: element.text, value: element.value };
    });
  };

  onChange = value => {
    if (value === this.props.currentSortBy) return;
    this.updateQuerySortBy(value);
  };

  render() {
    const { currentSortBy, loading, totalResults, values } = this.props;
    return (
      <ShouldRender
        condition={currentSortBy !== null && !loading && totalResults > 1}
      >
        {this.renderElement(currentSortBy, values, this.onChange)}
      </ShouldRender>
    );
  }
}

SortBy.propTypes = {
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
  updateQuerySortBy: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

SortBy.defaultProps = {
  renderElement: null,
};
