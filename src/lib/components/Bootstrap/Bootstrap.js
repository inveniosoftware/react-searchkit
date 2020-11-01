/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Overridable from 'react-overridable';

class Bootstrap extends Component {
  constructor(props) {
    super(props);
    this.appName = props.appName;
    this.searchOnInit = props.searchOnInit;
    this.eventListenerEnabled = props.eventListenerEnabled;
    this.onAppInitialized = props.onAppInitialized;
    this.searchOnUrlQueryStringChanged = props.searchOnUrlQueryStringChanged;
  }

  updateQueryState = (query) => this.props.updateQueryState(query);

  onQueryChanged = ({ detail: payload }) => {
    const appReceiverName = payload.appName || this.appName;
    if (appReceiverName === this.appName) {
      this.updateQueryState(payload.searchQuery);
    } else {
      console.debug(
        `RSK app '${this.appName}': ignoring event sent for app '${appReceiverName}'.`
      );
    }
  };

  componentDidMount() {
    if (this.eventListenerEnabled) {
      window.addEventListener('queryChanged', this.onQueryChanged);
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
    window.removeEventListener('queryChanged', this.onQueryChanged);
  }
}

Bootstrap.propTypes = {
  searchOnInit: PropTypes.bool,
  eventListenerEnabled: PropTypes.bool,
  appName: PropTypes.string,
};

Bootstrap.defaultProps = {
  searchOnInit: true,
};

export default Overridable.component('Bootstrap', Bootstrap);
