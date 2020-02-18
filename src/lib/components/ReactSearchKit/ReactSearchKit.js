/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { configureStore } from '../../store';
import { UrlHandlerApi } from '../../api';
import { Bootstrap } from '../Bootstrap';

export class ReactSearchKit extends Component {
  constructor(props) {
    super(props);
    const appConfig = {
      searchApi: props.searchApi,
      suggestionApi: props.suggestionApi,
      urlHandlerApi: props.urlHandlerApi.enabled
        ? props.urlHandlerApi.customHandler ||
          new UrlHandlerApi(props.urlHandlerApi.overrideConfig)
        : null,
      defaultSortByOnEmptyQuery: props.defaultSortByOnEmptyQuery,
    };
    this.store = configureStore(appConfig);
    this.appName = props.appName;
    this.eventListenerEnabled = props.eventListenerEnabled;
  }

  render() {
    const { searchOnInit } = this.props;

    return (
      <Provider store={this.store}>
        <Bootstrap
          searchOnInit={searchOnInit}
          appName={this.appName}
          eventListenerEnabled={this.eventListenerEnabled}
        >
          {this.props.children}
        </Bootstrap>
      </Provider>
    );
  }
}

ReactSearchKit.propTypes = {
  searchApi: PropTypes.object.isRequired,
  suggestionApi: PropTypes.object,
  urlHandlerApi: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    overrideConfig: PropTypes.shape({
      keepHistory: PropTypes.bool,
      urlFilterSeparator: PropTypes.string,
      urlParamsMapping: PropTypes.object,
      urlParamValidator: PropTypes.object,
      urlParser: PropTypes.object,
    }),
    customHandler: PropTypes.object,
  }),
  searchOnInit: PropTypes.bool,
  defaultSortByOnEmptyQuery: PropTypes.string,
  appName: PropTypes.string,
  eventListenerEnabled: PropTypes.bool,
};

ReactSearchKit.defaultProps = {
  suggestionApi: null,
  urlHandlerApi: {
    enabled: true,
    overrideConfig: {},
    customHandler: null,
  },
  searchOnInit: true,
  defaultSortByOnEmptyQuery: null,
  appName: 'RSK',
  eventListenerEnabled: false,
};
