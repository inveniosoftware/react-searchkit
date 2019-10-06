/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _isPlainObject from 'lodash/isPlainObject';
import _find from 'lodash/find';

export class ESResponseSerializer {
  _createAggregation(parentKeyName, buckets) {
    let aggregations = {};

    buckets.forEach(item => {
      const nestedField = _find(
        Object.keys(item),
        key =>
          _isPlainObject(item[key]) &&
          'buckets' in item[key] &&
          item[key].buckets.length
      );
      if (nestedField) {
        const nestedAggregationPath = [nestedField, 'buckets'];
        const nestedBuckets = this._extractFromPath(
          item,
          nestedAggregationPath
        );
        const newKeyName = ''.concat(parentKeyName, '.', item.key);
        aggregations[item.key] = this._createAggregation(
          ''.concat(newKeyName, '.', nestedField),
          nestedBuckets
        );
        aggregations[item.key]['key'] = newKeyName;
        aggregations[item.key]['name'] = item.key;
        aggregations[item.key]['total'] = item.doc_count;
        aggregations[item.key]['hasNestedField'] = nestedField;
      } else {
        const parentNestedField = parentKeyName.split('.').slice(-1);
        aggregations[item.key] = {
          hasNestedField: false,
          name: item.key,
          total: item.doc_count,
          key: ''.concat(parentKeyName, '.', item.key),
        };
      }
    }, this);

    return aggregations;
  }

  _extractFromPath(aggregation, pathToExtract) {
    return pathToExtract.reduce(
      (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
      aggregation
    );
  }

  _serializeAggregations(aggregationsResponse) {
    const aggregations = {};

    Object.keys(aggregationsResponse).forEach(aggregationName => {
      aggregations[aggregationName] = {};
      const mainBuckets = this._extractFromPath(
        aggregationsResponse[aggregationName],
        ['buckets']
      );
      aggregations[aggregationName] = this._createAggregation(
        aggregationName,
        mainBuckets
      );
    }, this);

    return aggregations;
  }

  /**
   * Return a serialized version of the API backend response for the app state `results`.
   * @param {object} payload the backend response payload
   */
  serialize = payload => {
    return {
      aggregations: {}, //this._serializeAggregations(payload.aggregations || {}),
      hits: payload.hits.hits.map(hit => hit._source),
      total: payload.hits.total.value,
    };
  };
}
