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

export default class SortBy extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.defaultValue = this.props.defaultValue;
    this.defaultValueOnEmptyString = this.props.defaultValueOnEmptyString;
    this.updateQuerySortBy = props.updateQuerySortBy;
    this.setInitialState = props.setInitialState;
    this.renderElement = props.renderElement || this._renderElement;
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

  _renderElement = (currentSortBy, options, onValueChange) => {
    const _options = options.map((element, index) => {
      return { key: index, text: element.text, value: element.value };
    });
    return (
      <Dropdown
        selection
        compact
        options={_options}
        value={currentSortBy}
        onChange={(e, { value }) => onValueChange(value)}
      />
    );
  };

  onChange = value => {
    if (value === this.props.currentSortBy) return;
    this.updateQuerySortBy(value);
  };

  renderSpanWithMargin = (text, margin) => {
    const size = '0.5em';
    let style;
    switch (margin) {
      case 'left':
        style = { marginLeft: size };
        break;
      case 'right':
        style = { marginRight: size };
        break;
      default:
        style = { margin: `0 ${size}` };
    }
    return <span style={style}>{text}</span>;
  };

  render() {
    const { currentSortBy, loading, totalResults, prefix, suffix } = this.props;
    return (
      <ShouldRender
        condition={currentSortBy !== null && !loading && totalResults > 0}
      >
        {prefix && this.renderSpanWithMargin(prefix, 'right')}
        {this.renderElement(currentSortBy, this.options, this.onChange)}
        {suffix && this.renderSpanWithMargin(suffix)}
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
  renderElement: PropTypes.func,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};

SortBy.defaultProps = {
  defaultValueOnEmptyString: null,
  currentSortBy: null,
  renderElement: null,
};
