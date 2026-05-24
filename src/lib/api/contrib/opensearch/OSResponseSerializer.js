/*
 * SPDX-FileCopyrightText: 2019 CERN.
 * SPDX-License-Identifier: MIT
 */

export class OSResponseSerializer {
  constructor() {
    this.serialize = this.serialize.bind(this);
  }

  /**
   * Return a serialized version of the API backend response for the app state `results`.
   * @param {object} payload the backend response payload
   */
  serialize(payload) {
    const { aggregations, hits } = payload;
    return {
      aggregations: aggregations || {},
      hits: hits.hits.map((hit) => hit._source),
      total: hits.total.value,
    };
  }
}
