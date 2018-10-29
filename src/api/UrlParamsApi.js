import _isEmpty from 'lodash/isEmpty';

export class UrlParamsApi {
  constructor(ignoreParams = {}) {
    this.ignoreParams = ignoreParams;
  }

  _parseUrlSearch(search = '') {
    let params = {};
    let parts = search.replace(/^\?/, '').split('&');
    parts.forEach(part => {
      let entries = part.split('=');
      let key = decodeURI(entries[0]);
      let value = decodeURI(entries[1]);
      if (!params[key]) {
        params[key] = decodeURI(value);
      } else {
        if (Array.isArray(params[key])) {
          params[key] = [value, ...params[key]];
        } else {
          params[key] = [params[key], value];
        }
      }
    });
    return params;
  }

  _setFieldIfMissing(obj, key, value) {
    if (!obj[key]) {
      obj[key] = value;
    }
  }

  _setFieldIfNotEmptyAndMissing(obj, key, value, cast) {
    if (!obj[key]) {
      if (value) {
        obj[key] = cast ? cast(value) : value;
      }
    }
  }

  _setFieldIfNotEmpty(obj, key, value, cast) {
    if (value) {
      obj[key] = cast ? cast(value) : value;
    }
  }

  _serializeParams(params) {
    let response = {};
    this._setFieldIfMissing(response, 'queryString', params['q']);

    this._setFieldIfNotEmptyAndMissing(response, 'sortBy', params['sortBy']);
    this._setFieldIfNotEmptyAndMissing(
      response,
      'sortOrder',
      params['sortOrder']
    );

    this._setFieldIfNotEmptyAndMissing(
      response,
      'page',
      params['page'],
      parseInt
    );
    this._setFieldIfNotEmptyAndMissing(
      response,
      'size',
      params['size'],
      parseInt
    );

    return response;
  }

  _transformQueryToUrlParams(query) {
    let params = {};
    let newQuery = '';
    params['q'] = query.queryString;
    this._setFieldIfNotEmpty(params, 'q', query.queryString);
    this._setFieldIfNotEmpty(params, 'sortBy', query.sortBy);

    this._setFieldIfNotEmpty(params, 'sortOrder', query.sortOrder);

    this._setFieldIfNotEmpty(params, 'page', query.page);
    this._setFieldIfNotEmpty(params, 'size', query.size);

    Object.keys(params).forEach((key, index) => {
      index === 0
        ? (newQuery = newQuery.concat(`?${key}=${params[key]}`))
        : (newQuery = newQuery.concat(`&${key}=${params[key]}`));
    });
    return encodeURI(newQuery);
  }

  // Check which params are missing and initialize them
  // Ignore specific params with passing an object on initialization
  checkRequiredParams(params, required) {
    let newParams = { ...params };
    Object.keys(required).forEach(key => {
      if (!newParams[key] && !this.ignoreParams[key]) {
        newParams[key] = required[key];
      }
    });
    return newParams;
  }

  // Returns an object compatible with react-searchkit query state from current location
  getUrlQuery(location) {
    let params = this._parseUrlSearch(location.search);
    return this._serializeParams(params);
  }

  // Returns a new query object to redirect to from query state
  setUrlQuery(query) {
    return this._transformQueryToUrlParams(query);
  }
}

let api = {
  queryString: '',
  filters: [],
  sorting: '',
};
