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
  _addAggregation(getParams, key, valueObj) {
    const value = valueObj['value'];
    if (value) {
      key in getParams
        ? getParams[key].push(value)
        : (getParams[key] = [value]);
    }

    const nestedKeys = Object.keys(valueObj).filter(key => key !== 'value');
    if (nestedKeys.length) {
      const nestedKey = nestedKeys[0];
      const nestedValueObj = valueObj[nestedKey];
      this._addAggregation(getParams, nestedKey, nestedValueObj);
    }
  }

  _addAggregations(getParams, aggregations) {
    aggregations.forEach(aggregation => {
      const rootKey = Object.keys(aggregation)[0];
      const valueObj = aggregation[rootKey];
      this._addAggregation(getParams, rootKey, valueObj);
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
      getParams['sortBy'] = sortBy;
    }
    if (sortOrder !== null) {
      getParams['sortOrder'] = sortOrder;
    }
    if (page !== null) {
      getParams['page'] = page;
    }
    if (size !== null) {
      getParams['size'] = size;
    }
    this._addAggregations(getParams, aggregations);

    return Qs.stringify(getParams, { arrayFormat: 'repeat' });
  };
}

/** Default backend response serializer */
class ResponseSerializer {
  _serializeAggregation(bucket) {
    const aggregation = {
      key: bucket.key,
      total: bucket.doc_count,
      hasNestedField: false,
    };

    const nestedField = _find(
      Object.keys(bucket),
      key =>
        _isPlainObject(bucket[key]) &&
        'buckets' in bucket[key] &&
        bucket[key].buckets.length
    );
    if (nestedField) {
      const buckets = bucket[nestedField].buckets;
      aggregation['hasNestedField'] = nestedField;
      aggregation[nestedField] = buckets.map(bucket =>
        this._serializeAggregation(bucket)
      );
    }
    return aggregation;
  }

  _serializeAggregations(aggregationsResponse) {
    const aggregations = {};
    Object.keys(aggregationsResponse).forEach(field => {
      const buckets = aggregationsResponse[field].buckets;
      aggregations[field] = buckets.map(bucket =>
        this._serializeAggregation(bucket)
      );
    });
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
