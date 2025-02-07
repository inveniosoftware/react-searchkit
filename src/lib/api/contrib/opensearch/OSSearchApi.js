/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import axios from "axios";
import _get from "lodash/get";
import _hasIn from "lodash/hasIn";
import { RequestCancelledError } from "../../errors";
import { OSRequestSerializer } from "./OSRequestSerializer";
import { OSResponseSerializer } from "./OSResponseSerializer";

export class OSSearchApi {
  constructor(config) {
    this.axiosConfig = _get(config, "axios", {});
    this.validateAxiosConfig();
    this.initSerializers(config);
    this.initInterceptors(config);
    this.initAxios();
    this.search = this.search.bind(this);
    this.axiosCancelToken = axios.CancelToken;
  }

  validateAxiosConfig() {
    if (!_hasIn(this.axiosConfig, "url")) {
      throw new Error("OSSearchApi config: `node` field is required.");
    }
  }

  initInterceptors(config) {
    this.requestInterceptor = _get(config, "interceptors.request", undefined);
    this.responseInterceptor = _get(config, "interceptors.response", undefined);
  }

  initSerializers(config) {
    const requestSerializerCls = _get(
      config,
      "os.requestSerializer",
      OSRequestSerializer
    );
    const responseSerializerCls = _get(
      config,
      "os.responseSerializer",
      OSResponseSerializer
    );

    this.requestSerializer = new requestSerializerCls();
    this.responseSerializer = new responseSerializerCls();
  }

  initAxios() {
    this.http = axios.create(this.axiosConfig);
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

    const payload = this.requestSerializer.serialize(stateQuery);

    try {
      const response = await this.http.request({
        url: this.axiosConfig.url,
        method: "POST",
        data: payload,
        cancelToken: this.axiosCancel.token,
      });
      return this.responseSerializer.serialize(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        throw new RequestCancelledError();
      } else {
        throw error;
      }
    }
  }
}
