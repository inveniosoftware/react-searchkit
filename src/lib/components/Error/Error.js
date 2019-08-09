/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ShouldRender } from '../ShouldRender';
import _isEmpty from 'lodash/isEmpty';

export default class Error extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this._renderElement;
  }

  _renderElement = error => {
    return <div>Oups! Something went wrong while fetching results.</div>;
  };

  render() {
    const { loading, error } = this.props;
    return (
      <ShouldRender condition={!loading && !_isEmpty(error)}>
        <Fragment>{this.renderElement(error)}</Fragment>
      </ShouldRender>
    );
  }
}

Error.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  renderElement: PropTypes.func,
};

Error.defaultProps = {
  renderElement: null,
};
