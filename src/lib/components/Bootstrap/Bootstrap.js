/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { AppContext } from '../';

class Bootstrap extends Component {
  constructor(props) {
    super(props);
    this.searchOnInit = props.searchOnInit;
    this.eventListenerEnabled = props.eventListenerEnabled;
    this.onAppInitialized = props.onAppInitialized;
    this.searchOnUrlQueryStringChanged = props.searchOnUrlQueryStringChanged;
  }

  updateQueryState = (query) => this.props.updateQueryState(query);

  onQueryChanged = ({ detail: payload }) => {
    const appName = this.context.appName;
    console.log(appName);
    const appNameNotDefined = !appName;
    if (appNameNotDefined) {
      this.updateQueryState(payload.searchQuery);
    } else {
      const eventRecipient = payload.appName;
      const sameName = eventRecipient === appName;
      if (sameName) {
        this.updateQueryState(payload.searchQuery);
      } else {
        console.debug(
          `React-SearchKit '${appName}': ignoring event sent for app '${eventRecipient}'`
        );
      }
    }
  };

  componentDidMount() {
    const appName = this.context.appName;
    console.log(this.context, appName);
    if (this.eventListenerEnabled) {
      window.addEventListener('queryChanged', this.onQueryChanged);
    }
    window.onpopstate = () => {
      this.searchOnUrlQueryStringChanged();
    };
    this.onAppInitialized(this.searchOnInit);
  }

  render() {
    return <>{this.props.children}</>;
  }

  componentWillUnmount() {
    window.onpopstate = () => {};
    window.removeEventListener('queryChanged', this.onQueryChanged);
  }
}

Bootstrap.propTypes = {
  searchOnInit: PropTypes.bool,
  eventListenerEnabled: PropTypes.bool,
};

Bootstrap.defaultProps = {
  searchOnInit: true,
  eventListenerEnabled: false,
};

Bootstrap.contextType = AppContext;

export default Overridable.component('Bootstrap', Bootstrap);
