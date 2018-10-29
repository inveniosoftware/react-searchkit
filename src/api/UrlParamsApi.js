import _isNaN from 'lodash/isNaN';
import _isNil from 'lodash/isNil';

import { parseUrlSearch, pushHistory, is_param_valid } from './utils';

export class UrlParamsApi {
  constructor(urlParamsSerializer, paramValidator, urlParser) {
    this.urlParamsSerializer = urlParamsSerializer || {
      queryString: 'q',
      sortBy: 'sb',
      sortOrder: 'so',
      page: 'p',
      size: 's',
    };
    this.paramValidator = paramValidator || is_param_valid;
    this.urlParser = urlParser || parseUrlSearch;

    // build the serializer from URL params to state
    this.stateSerializer = {};
    Object.keys(this.urlParamsSerializer).forEach(stateKey => {
      this.stateSerializer[this.urlParamsSerializer[stateKey]] = stateKey;
    });
  }

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

  _mergeParamsIntoState(params, queryState) {
    let newState = { ...queryState };
    Object.keys(params).forEach(paramKey => {
      const stateKey = this.stateSerializer[paramKey];
      if (this.paramValidator(paramKey, params[paramKey])) {
        if (newState.hasOwnProperty(stateKey)) {
          newState[stateKey] = params[paramKey];
        }
      }
    });
    return newState;
  }

  // Returns an object compatible with react-searchkit query state from current location
  get(currentQueryState, pushState) {
    const currentParams = this.urlParser(window.location.search);
    const newQueryState = this._mergeParamsIntoState(
      currentParams,
      currentQueryState
    );
    if (pushState) {
      this.set(newQueryState);
    }
    return newQueryState;
  }

  // Update the URL Params given a new query state
  set(newQueryState) {
    const newUrlParams = this._transformQueryToUrlParams(newQueryState);
    pushHistory(newUrlParams);
  }
}

let api = {
  queryString: '',
  filters: [],
  sortBy: '',
  sortOrder: '',
  page: 0,
  size: 1,
};
