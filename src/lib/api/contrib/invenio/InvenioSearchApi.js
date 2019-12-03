/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _get from 'lodash/get';
import _hasIn from 'lodash/hasIn';
import axios from 'axios';
import { InvenioRequestSerializer } from './InvenioRequestSerializer';
import { InvenioResponseSerializer } from './InvenioResponseSerializer';

export class InvenioSearchApi {
  constructor(config) {
    this.validateConfig(config);
    this.initSerializers(config);
    this.initAxios(config);
  }

  validateConfig(config) {
    if (!_hasIn(config, 'url')) {
      throw new Error('InvenioSearchApi config: `url` field is required.');
    }
  }

  initSerializers(config) {
    const requestSerializerCls = _get(
      config,
      'invenio.requestSerializer',
      InvenioRequestSerializer
    );
    const responseSerializerCls = _get(
      config,
      'invenio.responseSerializer',
      InvenioResponseSerializer
    );

    this.requestSerializer = new requestSerializerCls();
    this.responseSerializer = new responseSerializerCls();
  }

  initAxios(config) {
    delete config.invenio;
    const axiosConfig = {
      paramsSerializer: this.requestSerializer.serialize,
      baseURL: config.url, // transform URL to baseURL to have clean external APIs
      ...config,
    };
    this.http = axios.create(axiosConfig);
    if (config.interceptors) {
      this.addInterceptors(config.interceptors);
    }
  }

  addInterceptors(interceptors) {
    if (interceptors.request) {
      this.http.interceptors.request.use(
        interceptors.request.resolve,
        interceptors.request.reject
      );
    }
    if (interceptors.response) {
      this.http.interceptors.response.use(
        interceptors.response.resolve,
        interceptors.response.reject
      );
    }
  }

  /**
   * Perform the backend request to search and return the serialized list of results for the app state `results`.
   * @param {string} stateQuery the `query` state with the user input
   */
  search = async stateQuery => {
    const response = await this.http.request({
      params: stateQuery,
    });
    return this.responseSerializer.serialize(response.data);
  };
}
