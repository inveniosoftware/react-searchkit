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
import { UrlQueryStringHandler } from '../..//api';
import { Bootstrap } from '../Bootstrap';
import _isObject from 'lodash/isObject';
import _isFunction from 'lodash/isFunction';

export class ReactSearchKit extends Component {
  constructor(props) {
    super(props);
    const appConfig = {
      searchApi: props.searchApi,
      suggestionApi: props.suggestionApi,
      urlQueryStringHandler: props.persistentUrl.enabled
        ? props.persistentUrl.customHandler ||
          new UrlQueryStringHandler(props.persistentUrl.overrideConfig)
        : null,
      defaultSortByOnEmptyQuery: props.defaultSortByOnEmptyQuery,
    };
    this.store = configureStore(appConfig);
  }

  componentDidMount() {
    if (_isObject(this.props.history) && _isFunction(this.props.history.listen)) {
      this.unlisten = this.props.history.listen((location, action) => {
        console.log("on route change");
        console.log(location)
        console.log(action)
      });
    }
  }

  render() {
    const { searchOnInit } = this.props;

    return (
      <Provider store={this.store}>
        <Bootstrap searchOnInit={searchOnInit}>{this.props.children}</Bootstrap>
      </Provider>
    );
  }

  componentWillUnmount() {
    this.unlisten && this.unlisten();
    if (this.unlisten) {
      console.log('listen');
    }
  }
}

ReactSearchKit.propTypes = {
  searchApi: PropTypes.object,
  suggestionApi: PropTypes.object,
  persistentUrl: PropTypes.shape({
    enabled: PropTypes.bool,
    overrideConfig: PropTypes.shape({
      withHistory: PropTypes.bool,
      urlParamsMapping: PropTypes.object,
      paramValidator: PropTypes.object,
      urlParser: PropTypes.object,
    }),
    customHandler: PropTypes.object,
  }),
  searchOnInit: PropTypes.bool,
  defaultSortByOnEmptyQuery: PropTypes.string,
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired,
  }
};

ReactSearchKit.defaultProps = {
  searchApi: null,
  suggestionApi: null,
  persistentUrl: {
    enabled: true,
    overrideConfig: {
      withHistory: true,
    },
    customHandler: null,
  },
  searchOnInit: true,
  defaultSortByOnEmptyQuery: null,
  history: null,
};
