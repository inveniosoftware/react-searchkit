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

export default class SortOrder extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.defaultValue = this.props.defaultValue;
    this.updateQuerySortOrder = props.updateQuerySortOrder;
    this.setInitialState = props.setInitialState;
    this.renderElement = props.renderElement || this._renderElement;
  }

  _renderElement(currentSortOrder, values, onValueChange) {
    const onChange = (event, { value }) => {
      onValueChange(value);
    };
    return (
      <Dropdown
        selection
        compact
        options={this._mapOptions(values)}
        value={currentSortOrder}
        onChange={onChange}
      />
    );
  }

  componentWillMount() {
    this.setInitialState({
      sortOrder: this.defaultValue,
    });
  }

  _mapOptions = options => {
    return options.map((element, index) => {
      return { key: index, text: element.text, value: element.value };
    });
  };

  onChange = value => {
    if (value === this.props.currentSortOrder) return;
    this.updateQuerySortOrder(value);
  };

  render() {
    const { currentSortOrder, loading, totalResults, values } = this.props;

    return (
      <ShouldRender
        condition={currentSortOrder !== null && !loading && totalResults > 1}
      >
        {this.renderElement(currentSortOrder, values, this.onChange)}
      </ShouldRender>
    );
  }
}

SortOrder.propTypes = {
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
  currentSortOrder: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  updateQuerySortOrder: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

SortOrder.defaultProps = {
  renderElement: null,
};
