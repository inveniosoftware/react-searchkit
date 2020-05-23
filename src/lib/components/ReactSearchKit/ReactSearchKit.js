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
import { configureStore } from '../../store';
import { buildUID } from '../../util';
import { Bootstrap } from '../Bootstrap';
import { AppContext } from './AppContext';

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
      searchOnInit: props.searchOnInit,
    };
    this.store = configureStore(appConfig);
  }

  render() {
    const {
      appName,
      eventListenerEnabled,
      overridableId,
      searchOnInit,
    } = this.props;
    const context = {
      appName: appName,
    };
    const _overridableId = buildUID(
      'ReactSearchKit.children',
      overridableId,
      appName
    );
    return (
      <AppContext.Provider value={context}>
        <Provider store={this.store}>
          <Bootstrap
            searchOnInit={searchOnInit}
            eventListenerEnabled={eventListenerEnabled}
          >
            <Overridable id={_overridableId}>{this.props.children}</Overridable>
          </Bootstrap>
        </Provider>
      </AppContext.Provider>
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
  overridableId: PropTypes.string,
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
  appName: '',
  eventListenerEnabled: false,
  overridableId: '',
};

export default Overridable.component('ReactSearchKit', ReactSearchKit);
