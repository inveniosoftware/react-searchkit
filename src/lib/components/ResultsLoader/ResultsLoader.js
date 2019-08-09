/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

export default class ResultsLoader extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this._renderElement;
  }

  _renderElement = () => <Loader active size="huge" inline="centered" />;

  render() {
    return this.props.loading ? this.renderElement() : this.props.children;
  }
}

ResultsLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  renderElement: PropTypes.func,
};

ResultsLoader.defaultProps = {
  renderElement: null,
};
