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
import { Provider } from 'react-redux';
import { UrlHandlerApi } from '../../api';
import { createStoreWithConfig } from '../../store';
import { buildUID } from '../../util';
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
      searchOnInit: props.searchOnInit,
      initialQueryState: props.initialQueryState,
      defaultSortingOnEmptyQueryString: props.defaultSortingOnEmptyQueryString,
    };

    this.store = createStoreWithConfig(appConfig);
    this.appName = props.appName;
    this.eventListenerEnabled = props.eventListenerEnabled;
  }

  render() {
    const { searchOnInit, overridableId } = this.props;

    return (
      <Provider store={this.store}>
        <Bootstrap
          searchOnInit={searchOnInit}
          appName={this.appName}
          eventListenerEnabled={this.eventListenerEnabled}
        >
          <Overridable id={buildUID('ReactSearchKit.children', overridableId)}>
            {this.props.children}
          </Overridable>
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
  appName: PropTypes.string,
  eventListenerEnabled: PropTypes.bool,
  overridableId: PropTypes.string,
  initialQueryState: PropTypes.shape({
    queryString: PropTypes.string,
    suggestions: PropTypes.array,
    sortBy: PropTypes.string,
    sortOrder: PropTypes.string,
    page: PropTypes.number,
    size: PropTypes.number,
    filters: PropTypes.array,
    hiddenParams: PropTypes.array,
    layout: PropTypes.oneOf(['list', 'grid']),
  }),
  defaultSortingOnEmptyQueryString: PropTypes.shape({
    sortBy: PropTypes.string,
    sortOrder: PropTypes.string,
  }),
};

ReactSearchKit.defaultProps = {
  suggestionApi: null,
  urlHandlerApi: {
    enabled: true,
    overrideConfig: {},
    customHandler: null,
  },
  searchOnInit: true,
  appName: 'RSK',
  eventListenerEnabled: false,
  overridableId: '',
  initialQueryState: {},
  defaultSortingOnEmptyQueryString: {},
};

export default Overridable.component('ReactSearchKit', ReactSearchKit);
