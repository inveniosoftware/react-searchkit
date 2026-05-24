/*
 * SPDX-FileCopyrightText: 2019 CERN.
 * SPDX-License-Identifier: MIT
 */

import _isEmpty from "lodash/isEmpty";

export class OSRequestSerializer {
  constructor() {
    this.serialize = this.serialize.bind(this);
  }

  /**
   * Return a serialized version of the app state `query` for the API backend.
   * @param {object} stateQuery the `query` state to serialize
   */
  serialize(stateQuery) {
    const { queryString, sortBy, sortOrder, page, size } = stateQuery;

    const bodyParams = {};
    if (!_isEmpty(queryString)) {
      bodyParams["query"] = {
        query_string: {
          query: queryString,
        },
      };
    }
    if (sortBy) {
      const sortObj = {};
      sortObj[sortBy] = sortOrder && sortOrder === "desc" ? "desc" : "asc";
      bodyParams["sort"] = sortObj;
    }

    if (size > 0) {
      bodyParams["size"] = size;
    }

    if (page > 0) {
      const s = size > 0 ? size : 0;
      const from = (page - 1) * s;
      bodyParams["from"] = from;
    }

    return bodyParams;
  }
}
