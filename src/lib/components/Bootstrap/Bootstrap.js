/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import { Component } from "react";
import Overridable from "react-overridable";
import { AppContext } from "../ReactSearchKit/AppContext";

class Bootstrap extends Component {
  constructor(props) {
    super(props);
    this.searchOnInit = props.searchOnInit;
    this.eventListenerEnabled = props.eventListenerEnabled;
    this.onAppInitialized = props.onAppInitialized;
    this.searchOnUrlQueryStringChanged = props.searchOnUrlQueryStringChanged;
  }

  componentDidMount() {
    if (this.eventListenerEnabled) {
      window.addEventListener("queryChanged", this.onQueryChanged);
    }
    window.onpopstate = () => {
      this.searchOnUrlQueryStringChanged();
    };
    this.onAppInitialized(this.searchOnInit);
  }

  componentWillUnmount() {
    window.onpopstate = () => {};
    window.removeEventListener("queryChanged", this.onQueryChanged);
  }

  updateQueryState = (query) => {
    const { updateQueryState } = this.props;
    updateQueryState(query);
  };

  onQueryChanged = ({ detail: payload }) => {
    const { appName } = this.context;

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

  render() {
    const { children } = this.props;
    return children;
  }
}

Bootstrap.propTypes = {
  searchOnInit: PropTypes.bool,
  eventListenerEnabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  /* Redux */
  onAppInitialized: PropTypes.func.isRequired,
  updateQueryState: PropTypes.func.isRequired,
  searchOnUrlQueryStringChanged: PropTypes.func.isRequired,
};

Bootstrap.defaultProps = {
  searchOnInit: true,
  eventListenerEnabled: false,
};

Bootstrap.contextType = AppContext;

export default Overridable.component("Bootstrap", Bootstrap);
