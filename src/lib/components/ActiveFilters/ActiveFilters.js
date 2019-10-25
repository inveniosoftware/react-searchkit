/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Icon } from 'semantic-ui-react';

export default class ActiveFilters extends Component {
  constructor(props) {
    super(props);
    this.updateQueryFilters = props.updateQueryFilters;
    this.renderElement = props.renderElement || this._renderElement;
    this.renderActiveFilters =
      props.renderActiveFilters || this._renderActiveFilters;
  }

  _getLabel = filter => {
    const aggName = filter[0];
    let value = filter[1];
    let currentFilter = [aggName, value];
    const hasChild = filter.length === 3;
    if (hasChild) {
      const { label, activeFilter } = this._getLabel(filter[2]);
      value = `${value}.${label}`;
      currentFilter.push(activeFilter);
    }
    return {
      label: value,
      activeFilter: currentFilter,
    };
  };

  _renderElement = (filters, removeActiveFilter) => {
    return filters.map((filter, index) => {
      const { label, activeFilter } = this._getLabel(filter);
      return (
        <Label
          image
          key={index}
          onClick={() => removeActiveFilter(activeFilter)}
        >
          {label}
          <Icon name="delete" />
        </Label>
      );
    });
  };

  render() {
    const filters = this.props.filters;
    return filters.length
      ? this.renderElement(filters, this.updateQueryFilters)
      : null;
  }
}

ActiveFilters.propTypes = {
  filters: PropTypes.array.isRequired,
  updateQueryFilters: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

ActiveFilters.defaultProps = {
  renderElement: null,
};
