/*
 * SPDX-FileCopyrightText: 2019 CERN.
 * SPDX-License-Identifier: MIT
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
    const { aggregations, hits, ...extras } = payload;
    return {
      aggregations: aggregations || {},
      hits: hits.hits,
      total: hits.total,
      extras: extras,
    };
  }
}
