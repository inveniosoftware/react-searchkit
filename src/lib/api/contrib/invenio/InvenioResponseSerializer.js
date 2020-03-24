/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

/** Default backend response serializer */
export class InvenioResponseSerializer {
  constructor() {
    this.serialize = this.serialize.bind(this);
  }

  /**
   * Return a serialized version of the API backend response for the app state `results`.
   * @param {object} payload the backend response payload
   */
  serialize(payload) {
    return {
      aggregations: payload.aggregations || {},
      hits: payload.hits.hits,
      total: payload.hits.total,
    };
  }
}
