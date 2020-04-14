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

  render() {
    const { loading, totalResults, label } = this.props;
    const size = '0.5em';
    return (
      <ShouldRender condition={!loading && totalResults > 0}>
        <span style={({ marginLeft: size }, { marginRight: size })}>
          {label(this.renderElement(totalResults))}
        </span>
      </ShouldRender>
    );
  }
}

Count.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  renderElement: PropTypes.func,
  label: PropTypes.func,
};

Count.defaultProps = {
  renderElement: null,
  label: (val) => val,
};
