/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import axios from 'axios';
import { InvenioRequestSerializer } from './InvenioRequestSerializer';
import { InvenioResponseSerializer } from './InvenioResponseSerializer';

/** Default Invenio Search API adapter */
export class InvenioSearchApi {
  constructor(config = {}) {
    this.responseSerializer =
      config.responseSerializer || new InvenioResponseSerializer();

    const requestSerializer =
      config.requestSerializer || new InvenioRequestSerializer();

    // create an Axios instance with the given config
    const axiosConfig = {
      paramsSerializer: requestSerializer.serialize,
      baseURL: config.url, // transform URL to baseURL to have clean external APIs
      ...config,
    };
    this.http = axios.create(axiosConfig);
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
