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
    this.axiosConfig = _get(config, 'axios', {});
    this.validateAxiosConfig();
    this.initSerializers(config);
    this.initInterceptors(config);
    this.initAxios();
    this.search = this.search.bind(this);
  }

  validateAxiosConfig() {
    if (!_hasIn(this.axiosConfig, 'url')) {
      throw new Error('InvenioSearchApi config: `url` field is required.');
    }
  }

  initInterceptors(config) {
    this.requestInterceptor = _get(config, 'interceptors.request', undefined);
    this.responseInterceptor = _get(config, 'interceptors.response', undefined);
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

  initAxios() {
    const axiosConfig = {
      paramsSerializer: this.requestSerializer.serialize,
      ...this.axiosConfig,
    };
    this.http = axios.create(axiosConfig);
    this.addInterceptors();
  }

  addInterceptors() {
    if (this.requestInterceptor) {
      this.http.interceptors.request.use(
        this.requestInterceptor.resolve,
        this.requestInterceptor.reject
      );
    }
    if (this.responseInterceptor) {
      this.http.interceptors.request.use(
        this.responseInterceptor.resolve,
        this.responseInterceptor.reject
      );
    }
  }

  /**
   * Perform the backend request to search and return the serialized list of results for the app state `results`.
   * @param {string} stateQuery the `query` state with the user input
   */
  async search(stateQuery) {
    const response = await this.http.request({
      params: stateQuery,
    });
    return this.responseSerializer.serialize(response.data);
  }
}
