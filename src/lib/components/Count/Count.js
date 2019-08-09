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
    const { loading, totalResults } = this.props;
    return (
      <ShouldRender condition={!loading && totalResults > 0}>
        {this.renderElement(totalResults)}
      </ShouldRender>
    );
  }
}

Count.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  renderElement: PropTypes.func,
};

Count.defaultProps = {
  renderElement: null,
};
