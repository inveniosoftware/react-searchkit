/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Bootstrap extends Component {
  constructor(props) {
    super(props);

    this.searchOnInit = props.searchOnInit;
    this.onAppInitialized = props.onAppInitialized;
    this.searchOnUrlQueryStringChanged = props.searchOnUrlQueryStringChanged;
  }

  componentDidMount() {
    window.onpopstate = () => {
      this.searchOnUrlQueryStringChanged();
    };
    this.onAppInitialized(this.searchOnInit);
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

Bootstrap.propTypes = {
  searchOnInit: PropTypes.bool,
};

Bootstrap.defaultProps = {
  searchOnInit: true,
};
