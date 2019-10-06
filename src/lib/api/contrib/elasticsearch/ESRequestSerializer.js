/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _isEmpty from 'lodash/isEmpty';

export class ESRequestSerializer {
  _addAggregations(getParams, aggregations) {
    aggregations.forEach(aggregation => {
      const rootKey = Object.keys(aggregation)[0];

      /**
       * The selection represent any one of the aggregation values clicked at any level of depth.
       * Its value is the whole path e.g. for Type -> Publication -> (Subtype)Article
       * the value will be type.publication.subtype.article from which the array will be created
       * @type {string[]}
       */
      const selection = aggregation[rootKey]['value'].split('.');

      /**
       * For each category:name pair (e.g. subtype:article) in the path
       * add it to the request if not already present
       */
      for (let i = 0, j = 1; j <= selection.length; i += 2, j += 2) {
        const key = selection[i];
        const value = selection[j];
        key in getParams
          ? getParams[key].push(value)
          : (getParams[key] = [value]);
      }
    });
  }

  /**
   * Return a serialized version of the app state `query` for the API backend.
   * @param {object} stateQuery the `query` state to serialize
   */
  serialize = stateQuery => {
    const {
      queryString,
      sortBy,
      sortOrder,
      page,
      size,
      aggregations,
    } = stateQuery;

    const bodyParams = {};
    if (!_isEmpty(queryString)) {
      bodyParams['query'] = {
        query_string: {
          query: queryString,
        },
      };
    }
    if (sortBy !== null) {
      const sortObj = {};
      sortObj[sortBy] = sortOrder && sortOrder === 'desc' ? 'desc' : 'asc';
      bodyParams['sort'].push(sortObj);
    }

    if (size > 0) {
      bodyParams['size'] = size;
    }

    if (page > 0) {
      const s = size > 0 ? size : 0;
      const from = (page - 1) * s;
      bodyParams['from'] = from;
    }
    // this._addAggregations(getParams, aggregations);

    return bodyParams;
  };
}
