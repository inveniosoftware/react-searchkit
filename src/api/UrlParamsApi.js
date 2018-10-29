import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import _isNaN from 'lodash/isNaN';
import _isNil from 'lodash/isNil';

export class UrlParamsApi {
  constructor(
    urlParamsSerializer = {
      queryString: 'q',
      sortBy: 'sb',
      sortOrder: 'so',
      page: 'p',
      size: 's',
    }
  ) {
    this.urlParamsSerializer = urlParamsSerializer;
    // build the serializer from URL params to state
    this.stateSerializer = {};
    Object.keys(this.urlParamsSerializer).forEach(stateKey => {
      this.stateSerializer[this.urlParamsSerializer[stateKey]] = stateKey;
    });
  }

  // UTILS -----------------------------------------------------------------------
  _parseUrlSearch(search = '') {
    let params = {};
    let parts = search.replace(/^\?/, '').split('&');
    parts.forEach(part => {
      const entries = part.split('=');
      const key = decodeURI(entries[0]);
      const value = decodeURI(entries[1]);
      try {
        // TODO: FIX ME
        params[key] = JSON.parse(value);
      } catch (e) {
        console.error(`Cannot parse value ${value} for param ${key}.`);
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

  _pushHistory(query) {
    if (window.history.pushState) {
      window.history.pushState({ path: query }, '', query);
    }
  }
  // -----------------------------------------------------------------------

  // _serializeParams(params, requiredParams) {
  //   let response = this._extractParams(params);
  //   response = this._checkRequiredParams(response, requiredParams);
  //   return response;
  // }

  // _extractParams(params) {
  //   let response = {};
  //   this._setFieldIfMissing(response, 'queryString', params['q']);

  //   this._setFieldIfNotEmptyAndMissing(response, 'sortBy', params['sortBy']);
  //   this._setFieldIfNotEmptyAndMissing(
  //     response,
  //     'sortOrder',
  //     params['sortOrder']
  //   );

  //   this._setFieldIfNotEmptyAndMissing(
  //     response,
  //     'page',
  //     params['page'],
  //     parseInt
  //   );
  //   this._setFieldIfNotEmptyAndMissing(
  //     response,
  //     'size',
  //     params['size'],
  //     parseInt
  //   );

  //   return response;
  // }

  // // Check which params are missing and initialize them
  // // Ignore specific params with passing an object on initialization
  // _checkRequiredParams(params, required) {
  //   let newParams = { ...params };
  //   Object.keys(required).forEach(key => {
  //     if (!newParams[key] && !this.ignoreParams[key]) {
  //       newParams[key] = required[key];
  //     }
  //   });
  //   return newParams;
  // }

  _transformQueryToUrlParams(queryState) {
    let params = {};
    let newQuery = '';
    Object.keys(queryState).forEach(stateKey => {
      if (this.urlParamsSerializer.hasOwnProperty(stateKey)) {
        const paramKey = this.urlParamsSerializer[stateKey];
        if (!_isNil(queryState[stateKey]) && !_isNaN(queryState[stateKey])) {
          params[paramKey] = queryState[stateKey];
        }
      }
    });

    Object.keys(params).forEach((key, index) => {
      index === 0
        ? (newQuery = newQuery.concat(`?${key}=${params[key]}`))
        : (newQuery = newQuery.concat(`&${key}=${params[key]}`));
    });
    return encodeURI(newQuery);
  }

  _is_valid = (key, value) => true;

  _mergeParamsIntoState(params, queryState) {
    let newState = { ...queryState };
    Object.keys(params).forEach(paramKey => {
      if (this._is_valid(paramKey, params[paramKey])) {
        const stateKey = this.stateSerializer[paramKey];
        if (newState.hasOwnProperty(stateKey)) {
          newState[stateKey] = params[paramKey];
        }
      }
    });
    return newState;
  }

  // Returns an object compatible with react-searchkit query state from current location
  get(currentQueryState) {
    const currentParams = this._parseUrlSearch(window.location.search);
    const newQueryState = this._mergeParamsIntoState(
      currentParams,
      currentQueryState
    );
    this.set(newQueryState);
    return newQueryState;
  }

  // Update the URL Params given a new query state
  set(newQueryState) {
    const newUrlParams = this._transformQueryToUrlParams(newQueryState);
    this._pushHistory(newUrlParams);
  }
}

let api = {
  queryString: '',
  filters: [],
  sorting: '',
};
