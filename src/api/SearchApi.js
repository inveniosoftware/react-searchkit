import axios from 'axios';
import _isPlainObject from 'lodash/isPlainObject';
import _find from 'lodash/find';
import Qs from 'qs';

export class SearchApi {
  _addAggregationsToParams(params, aggregations) {
    let newParams = { ...params };
    Object.keys(aggregations).forEach(field => {
      aggregations[field].forEach(value => {
        if (!newParams.hasOwnProperty(field)) {
          newParams[field] = value;
        } else {
          newParams[field] = [...newParams[field], value];
        }
      });
    });
    return newParams;
  }

  _processParams(queryString, sortBy, sortOrder, page, size, aggregations) {
    let params = {};
    params['q'] = queryString;

    params['sortBy'] = sortBy;
    params['sortOrder'] = sortOrder;
    params['page'] = page;
    params['size'] = size;

    if (aggregations) {
      params = this._addAggregationsToParams(params, aggregations);
    }

    return params;
  }

  search(query, apiConfig) {
    let { queryString, sortBy, sortOrder, page, size, aggregations } = query;
    let params = this._processParams(
      queryString,
      sortBy,
      sortOrder,
      page,
      size,
      aggregations
    );

    if (!apiConfig['paramSerializer']) {
      apiConfig['paramsSerializer'] = params =>
        Qs.stringify(params, { arrayFormat: 'repeat' });
    }
    apiConfig['params'] = { ...apiConfig['params'], ...params };
    return axios(apiConfig);
  }

  _serializeAggregation(bucket) {
    let aggregation = {
      key: bucket.key,
      total: bucket.doc_count,
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
      aggregation[nestedField] = buckets.map(bucket =>
        this._serializeAggregation(bucket)
      );
    }
    return aggregation;
  }

  _serializeAggregations(aggregationsResponse) {
    let aggregations = {};
    Object.keys(aggregationsResponse).forEach(field => {
      const buckets = aggregationsResponse[field].buckets;
      aggregations[field] = buckets.map(bucket =>
        this._serializeAggregation(bucket)
      );
    });
    return aggregations;
  }

  serialize(response) {
    return {
      aggregations: this._serializeAggregations(response.aggregations || {}),
      hits: response.hits.hits,
      total: response.hits.total,
    };
  }
}
