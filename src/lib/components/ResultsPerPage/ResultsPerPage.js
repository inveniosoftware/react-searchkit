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
import { ShouldRender } from '../ShouldRender';

export default class ResultsPerPage extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.defaultValue = props.defaultValue;
    this.updateQuerySize = this.props.updateQuerySize;
    this.setInitialState = props.setInitialState;
    this.renderElement = props.renderElement || this._renderElement;
  }

  componentDidMount() {
    if (this.props.currentSize === -1) {
      this.setInitialState({
        size: this.defaultValue,
      });
    }
  }

  _renderElement = (currentSize, options, onValueChange) => {
    const _options = options.map((element, index) => {
      return { key: index, text: element.text, value: element.value };
    });
    return (
      <Dropdown
        inline
        compact
        options={_options}
        value={currentSize}
        onChange={(e, { value }) => onValueChange(value)}
      />
    );
  };

  onChange = value => {
    if (value === this.props.currentSize) return;
    this.updateQuerySize(value);
  };

  render() {
    const { loading, currentSize, totalResults } = this.props;
    return (
      <ShouldRender
        condition={!loading && totalResults > 0 && currentSize !== -1}
      >
        {this.renderElement(currentSize, this.options, this.onChange)}
      </ShouldRender>
    );
  }
}

ResultsPerPage.propTypes = {
  currentSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.number.isRequired,
  updateQuerySize: PropTypes.func.isRequired,
  setInitialState: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

ResultsPerPage.defaultProps = {
  renderElement: null,
};
