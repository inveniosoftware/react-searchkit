/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import axios from 'axios';
import _get from 'lodash/get';
import _hasIn from 'lodash/hasIn';
import _isEmpty from 'lodash/isEmpty';
import { updateQueryState } from '../../../state/selectors';
import { INITIAL_QUERY_STATE_KEYS } from '../../../storeConfig';
import { RequestCancelledError } from '../../errors';
import { InvenioRequestSerializer } from './InvenioRequestSerializer';
import { InvenioResponseSerializer } from './InvenioResponseSerializer';
import { InvenioRecordsResourcesRequestSerializer } from './InvenioRecordsResourcesRequestSerializer';

export class InvenioSearchApi {
  constructor(config) {
    this.axiosConfig = _get(config, 'axios', {});
    this.validateAxiosConfig();
    this.initSerializers(config);
    this.initInterceptors(config);
    this.initAxios();
    this.search = this.search.bind(this);
    this.axiosCancelToken = axios.CancelToken;
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
    this.requestSerializerMap = {
      "InvenioRecordsResourcesRequestSerializer" : InvenioRecordsResourcesRequestSerializer,
      "InvenioRequestSerializer" : InvenioRequestSerializer
    }
    const requestSerializerCls = _get(
      config,
      this.requestSerializerMap[config['invenio.requestSerializer']],
      InvenioRecordsResourcesRequestSerializer
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
    // cancel any previous request in case it is still happening
    this.axiosCancel && this.axiosCancel.cancel();
    // generate a new cancel token for this request
    this.axiosCancel = this.axiosCancelToken.source();

    try {
      let response = await this.http.request({
        params: stateQuery,
        cancelToken: this.axiosCancel.token,
      });

      response = this.responseSerializer.serialize(response.data);
      const newQueryState = updateQueryState(
        stateQuery,
        response.extras,
        INITIAL_QUERY_STATE_KEYS
      );
      if (!_isEmpty(newQueryState)) {
        response.newQueryState = newQueryState;
      }
      delete response.extras;
      return response;
    } catch (error) {
      if (axios.isCancel(error)) {
        throw new RequestCancelledError();
      } else {
        throw error;
      }
    }
  }
}
