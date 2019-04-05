/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import axios from 'axios';
import _isPlainObject from 'lodash/isPlainObject';
import _find from 'lodash/find';
import Qs from 'qs';

/** Default backend request serializer */
class RequestSerializer {
  _addAggregations(getParams, aggregations) {
    aggregations.forEach(aggregation => {
      const rootKey = Object.keys(aggregation)[0];

      /**
       * The selection represent any one of the aggregation values clicked at any level of depth.
       * Its value is the whole path e.g. for Type -> Publication -> (Subtype)Article
       * the value will be type.publication.subtype.article from which the array will be created
       * @type {string[]}
       */
      const selection = aggregation[rootKey]["value"].split('.');

      /**
       * For each category:name pair (e.g. subtype:article) in the path
       * add it to the request if not already present
       */
      for (let i = 0, j = 1; j <= selection.length; i += 2, j += 2) {
        const key = selection[i];
        const value = selection[j];
        key in getParams ? getParams[key].push(value) : (getParams[key] = [value]);
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

    const getParams = {};
    if (queryString !== null) {
      getParams['q'] = queryString;
    }
    if (sortBy !== null) {
      getParams['sort'] = sortBy;

      if (sortOrder !== null) {
        getParams['sort'] = sortOrder === 'desc' ? `-${sortBy}` : sortBy;
      }
    }
    if (page > 0) {
      getParams['page'] = page;
    }
    if (size > 0) {
      getParams['size'] = size;
    }
    this._addAggregations(getParams, aggregations);

    return Qs.stringify(getParams, { arrayFormat: 'repeat' });
  };
}

/** Default backend response serializer */
class ResponseSerializer {
  _createAggregation(parentKeyName, buckets) {
    let aggregations = new Object();

      buckets.forEach(item => {
        const nestedField = _find(
          Object.keys(item),
          key =>
            _isPlainObject(item[key]) &&
            'buckets' in item[key] &&
            item[key].buckets.length
        );
        if (nestedField) {
          const nestedAggregationPath = [nestedField, "buckets"];
          const nestedBuckets = this._extractFromPath(item, nestedAggregationPath);
          const newKeyName = "".concat(parentKeyName, ".", item.key);
          aggregations[item.key] = this._createAggregation("".concat(newKeyName, ".", nestedField), nestedBuckets);
          aggregations[item.key]["key"] = newKeyName;
          aggregations[item.key]["name"] = item.key;
          aggregations[item.key]["total"] = item.doc_count;
          aggregations[item.key]["hasNestedField"] = nestedField;
        }
        else {
          const parentNestedField = parentKeyName.split(".").slice(-1);
          aggregations[item.key] = {
              "hasNestedField": false,
              "name": item.key,
              "total": item.doc_count,
              "key": "".concat(parentKeyName, ".", item.key)
          };
        }
      }, this);

      return aggregations;
  }

  _extractFromPath(aggregation, pathToExtract) {
    return pathToExtract.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, aggregation);
  }

  _serializeAggregations(aggregationsResponse) {
    const aggregations = {};

    Object.keys(aggregationsResponse).forEach(aggregationName => {
      aggregations[aggregationName] = {};
      const mainBuckets = this._extractFromPath(aggregationsResponse[aggregationName], ["buckets"]);
      aggregations[aggregationName] = this._createAggregation(aggregationName, mainBuckets);
    }, this);

    return aggregations;
  }

  /**
   * Return a serialized version of the API backend response for the app state `results`.
   * @param {object} payload the backend response payload
   */
  serialize = payload => {
    return {
      aggregations: this._serializeAggregations(payload.aggregations || {}),
      hits: payload.hits.hits,
      total: payload.hits.total,
    };
  };
}

/**  */
export class SearchApi {
  constructor(config = {}) {
    this.config = config;
    this.requestSerializer =
      config.requestSerializer || new RequestSerializer();
    this.responseSerializer =
      config.responseSerializer || new ResponseSerializer();
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