import axios from 'axios';
import _isPlainObject from 'lodash/isPlainObject';
import _find from 'lodash/find';
import Qs from 'qs';

export class SearchApi {
  _addAggregation(params, key, valueObj) {
    const value = valueObj['value'];
    if (value) {
      key in params ? params[key].push(value) : (params[key] = [value]);
    }

    const nestedKeys = Object.keys(valueObj).filter(key => key !== 'value');
    if (nestedKeys.length) {
      const nestedKey = nestedKeys[0];
      const nestedValueObj = valueObj[nestedKey];
      this._addAggregation(params, nestedKey, nestedValueObj);
    }
  }

  _addAggregations(params, aggregations) {
    aggregations.forEach(aggregation => {
      const rootKey = Object.keys(aggregation)[0];
      const valueObj = aggregation[rootKey];
      this._addAggregation(params, rootKey, valueObj);
    });
  }

  _processParams(queryString, sortBy, sortOrder, page, size, aggregations) {
    let params = {};
    params['q'] = queryString;

    params['sortBy'] = sortBy;
    params['sortOrder'] = sortOrder;
    params['page'] = page;
    params['size'] = size;
    this._addAggregations(params, aggregations);

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
