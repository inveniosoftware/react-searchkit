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
    const { loading, currentSize, totalResults, prefix, suffix } = this.props;
    return (
      <ShouldRender
        condition={!loading && totalResults > 0 && currentSize !== -1}
      >
        {this.renderSpanWithMargin(prefix, 'right')}
        {this.renderElement(currentSize, this.options, this.onChange)}
        {this.renderSpanWithMargin(suffix)}
      </ShouldRender>
    );
  }
}

ResultsPerPage.propTypes = {
  currentSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.number,
  updateQuerySize: PropTypes.func.isRequired,
  setInitialState: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};

ResultsPerPage.defaultProps = {
  defaultValue: 10,
  renderElement: null,
};
