/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import axios from 'axios';
import {
  InvenioRequestSerializer,
  InvenioResponseSerializer
} from "../contrib/Serializers";

/**  */
export class SearchApi {
  constructor(config = {}) {
    this.config = config;
    this.requestSerializer =
      config.requestSerializer || new InvenioRequestSerializer();
    this.responseSerializer =
      config.responseSerializer || new InvenioResponseSerializer();
  }

  /**
   * Perform the backend request to search and return the serialized list of results for the app state `results`.
   * @param {string} stateQuery the `query` state with the user input
   */
  search = async stateQuery => {
    const axiosConfig = {
      paramsSerializer: stateQuery =>
        this.requestSerializer.serialize(stateQuery),
      params: stateQuery,
      ...this.config,
    };

    const response = await axios(axiosConfig);
    return this.responseSerializer.serialize(response.data);
  };
}