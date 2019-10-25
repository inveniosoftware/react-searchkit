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
    this.historyListen = props.historyListen;
    this.onAppInitialized = props.onAppInitialized;
    this.onBrowserHistoryExternallyChanged =
      props.onBrowserHistoryExternallyChanged;
    this.searchOnUrlQueryStringChanged = props.searchOnUrlQueryStringChanged;
  }

  componentDidMount() {
    if (this.historyListen) {
      this.historyUnlisten = this.historyListen(() => {
        this.onBrowserHistoryExternallyChanged();
      });
    }

    window.onpopstate = () => {
      this.searchOnUrlQueryStringChanged();
    };

    this.onAppInitialized(this.searchOnInit);
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }

  componentWillUnmount() {
    this.historyUnlisten && this.historyUnlisten();
    window.onpopstate = () => {};
  }
}

Bootstrap.propTypes = {
  searchOnInit: PropTypes.bool,
  historyListen: PropTypes.func,
};

Bootstrap.defaultProps = {
  searchOnInit: true,
  historyListen: null,
};
