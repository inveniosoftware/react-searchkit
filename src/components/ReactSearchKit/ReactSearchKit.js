/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { createProvider } from 'react-redux';
import PropTypes from 'prop-types';
import { configureStore, storeKey } from '@app/store';
import { UrlQueryStringHandler } from '@app';
import { Bootstrap } from '@app/components/Bootstrap';
import 'semantic-ui-css/semantic.min.css';

const Provider = createProvider(storeKey);

export class ReactSearchKit extends Component {
  constructor(props) {
    super(props);
    const appConfig = {
      searchApi: props.searchApi,
      urlQueryStringHandler: props.persistentUrl.enabled
        ? props.persistentUrl.customHandler ||
          new UrlQueryStringHandler(props.persistentUrl.overrideConfig)
        : null,
      defaultSortByOnEmptyQuery: props.defaultSortByOnEmptyQuery,
    };
    console.log(appConfig);

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
  searchApi: PropTypes.object.isRequired,
  persistentUrl: PropTypes.shape({
    enabled: PropTypes.bool,
    overrideConfig: PropTypes.shape({
      urlParamsMapping: PropTypes.object,
      paramValidator: PropTypes.object,
      urlParser: PropTypes.object,
    }),
    customHandler: PropTypes.object,
  }),
  searchOnInit: PropTypes.bool,
  defaultSortByOnEmptyQuery: PropTypes.string,
};

ReactSearchKit.defaultProps = {
  persistentUrl: {
    enabled: true,
    overrideConfig: {},
    customHandler: null,
  },
  searchOnInit: true,
  defaultSortByOnEmptyQuery: null,
};
