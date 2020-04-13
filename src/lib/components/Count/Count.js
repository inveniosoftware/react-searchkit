/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';
import { ShouldRender } from '../ShouldRender';

export default class Count extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this._renderElement;
  }

  _renderElement(totalResults) {
    return <Label color={'blue'}>{totalResults}</Label>;
  }

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
    const { loading, totalResults, prefix, suffix } = this.props;
    return (
      <ShouldRender condition={!loading && totalResults > 0}>
        {this.renderSpanWithMargin(prefix, 'right')}
        {this.renderElement(totalResults)}
        {this.renderSpanWithMargin(suffix)}
      </ShouldRender>
    );
  }
}

Count.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  renderElement: PropTypes.func,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};

Count.defaultProps = {
  renderElement: null,
};
