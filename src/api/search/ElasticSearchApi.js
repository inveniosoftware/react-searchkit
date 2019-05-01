/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
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
  _createAggregationsBody(aggregations) {
    if (!aggregations) {
      return {};
    }

    const aggsPayload = {};
    aggregations.forEach(aggregation => {
      aggsPayload[aggregation['name']] = {
        terms: { field: aggregation['field'] },
      };
    });
    return { aggs: aggsPayload };
  }

  _createQueryBody(selectedAggs) {
    if (!selectedAggs) {
      return {};
    }

    const termsPayload = {};
    selectedAggs.forEach(aggregation => {
      termsPayload[aggregation['name']] = {
        terms: { field: aggregation['field'] },
      };
    });
    return { query: termsPayload };
  }

  /**
   * Return a serialized version of the app state `query` for the API backend.
   * @param {object} stateQuery the `query` state to serialize
   */
  serializeQS = stateQuery => {
    const { queryString, sortBy, sortOrder, page, size } = stateQuery;

    const getParams = {};
    if (queryString) {
      getParams['q'] = queryString;
    }
    if (sortBy !== null) {
      getParams['sort'] = sortBy;

      if (sortOrder !== null) {
        getParams['sort'] =
          sortOrder === 'desc' ? `${sortBy}:desc` : `${sortBy}:asc`;
      }
    }
    if (page > 0) {
      getParams['from'] = (page - 1) * size;
    }
    if (size > 0) {
      getParams['size'] = size;
    }

    return Qs.stringify(getParams, { arrayFormat: 'repeat' });
  };

  /**
   * Return a serialized version of the app state `query` for the API backend.
   * @param {object} stateQuery the `query` state to serialize
   */
  serializeBody = (aggregations, selectedAggs) => {
    const aggs = this._createAggregationsBody(aggregations);
    const query = this._createQueryBody(selectedAggs);

    selectedAggs.forEach(agg => {
      const rootKey = Object.keys(agg)[0];
      const valueObj = agg[rootKey];
      this._addAggregation(aggsPayload, rootKey, valueObj);
    });

    const a = console.log(a);
    return a;
  };
}

/** Default backend response serializer */
class ResponseSerializer {
  _serializeAggregation(bucket) {
    const aggregation = {
      value: bucket.key,
      total: bucket.doc_count,
      hasNestedAgg: false,
    };

    // check if the agg name has a field called `bucket` that is an object not empty.
    const nestedAggName = _find(
      Object.keys(bucket),
      key =>
        _isPlainObject(bucket[key]) &&
        'buckets' in bucket[key] &&
        bucket[key].buckets.length
    );
    if (nestedAggName) {
      const buckets = bucket[nestedAggName].buckets;
      aggregation['hasNestedAgg'] = nestedAggName;
      aggregation[nestedAggName] = buckets.map(bucket =>
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
      hits: payload.hits.hits.map(hit => hit._source),
      total: payload.hits.total,
    };
  };
}

/**  */
export class ElasticSearchApi {
  constructor(config = {}) {
    this.config = config;
    this.requestSerializer =
      config.requestSerializer || new RequestSerializer();
    this.responseSerializer =
      config.responseSerializer || new ResponseSerializer();
    this.aggregations = config.aggregations || {};
  }

  /**
   * Perform the backend request to search and return the serialized list of results for the app state `results`.
   * @param {string} stateQuery the `query` state with the user input
   */
  search = async stateQuery => {
    const { aggregations: selectedAggs } = stateQuery;

    const axiosConfig = {
      method: 'post',
      params: stateQuery,
      paramsSerializer: this.requestSerializer.serializeQS,
      data: this.requestSerializer.serializeBody(
        this.aggregations,
        selectedAggs
      ),
      ...this.config,
    };

    const response = await axios(axiosConfig);
    const c = this.responseSerializer.serialize(response.data);
    console.log(c);
    return c;
  };
}
