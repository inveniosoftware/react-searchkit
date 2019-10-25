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
  }

  render() {
    const { searchOnInit } = this.props;

    return (
      <Provider store={this.store}>
        <Bootstrap searchOnInit={searchOnInit}>{this.props.children}</Bootstrap>
      </Provider>
    );
  }
}

ReactSearchKit.propTypes = {
  searchApi: PropTypes.object,
  suggestionApi: PropTypes.object,
  urlHandlerApi: PropTypes.shape({
    enabled: PropTypes.bool,
    overrideConfig: PropTypes.shape({
      withHistory: PropTypes.bool,
      urlParamsMapping: PropTypes.object,
      urlParamValidator: PropTypes.object,
      urlParser: PropTypes.object,
    }),
    customHandler: PropTypes.object,
  }),
  searchOnInit: PropTypes.bool,
  defaultSortByOnEmptyQuery: PropTypes.string,
};

ReactSearchKit.defaultProps = {
  searchApi: null,
  suggestionApi: null,
  urlHandlerApi: {
    enabled: true,
    overrideConfig: {
      withHistory: true,
    },
    customHandler: null,
  },
  searchOnInit: true,
  defaultSortByOnEmptyQuery: null,
};
