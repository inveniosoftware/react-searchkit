/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _get from 'lodash/get';
import _hasIn from 'lodash/hasIn';
import axios from 'axios';
import { ESRequestSerializer } from './ESRequestSerializer';
import { ESResponseSerializer } from './ESResponseSerializer';

export class ESSearchApi {
  constructor(config) {
    console.log('constructor');
    this.validateConfig(config);
    this.initSerializers(config);
    this.initAxios(config);
  }

  validateConfig(config) {
    if (!_hasIn(config, 'url')) {
      throw new Error('ESSearchApi config: `node` field is required.');
    }
  }

  initSerializers(config) {
    const requestSerializerCls = _get(
      config,
      'es.requestSerializer',
      ESRequestSerializer
    );
    const responseSerializerCls = _get(
      config,
      'es.responseSerializer',
      ESResponseSerializer
    );

    this.requestSerializer = new requestSerializerCls();
    this.responseSerializer = new responseSerializerCls();
  }

  initAxios(config) {
    delete config.es;
    const axiosConfig = {
      baseURL: config.url,
      ...config,
    };
    this.http = axios.create(axiosConfig);
  }

  /**
   * Perform the backend request to search and return the serialized list of results for the app state `results`.
   * @param {string} stateQuery the `query` state with the user input
   */
  search = async stateQuery => {
    const payload = this.requestSerializer.serialize(stateQuery);
    const response = await this.http.request({
      method: 'POST',
      data: payload,
    });
    return this.responseSerializer.serialize(response.data);
  };
}
