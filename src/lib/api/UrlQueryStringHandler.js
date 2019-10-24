/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import Qs from 'qs';
import _isNaN from 'lodash/isNaN';
import _isNil from 'lodash/isNil';
import _cloneDeep from 'lodash/cloneDeep';

const pushHistory = query => {
  if (window.history.pushState) {
    window.history.pushState({ path: query }, '', query);
  }
};

const replaceHistory = query => {
  if (window.history.replaceState) {
    window.history.replaceState({ path: query }, '', query);
  }
};

/** Default URL parser implementation */
class UrlParser {
  _sanitizeParamValue = value => {
    let parsedValue = parseInt(value);
    if (_isNaN(parsedValue)) {
      try {
        const _value = JSON.parse(value);
        if (!_isNil(_value)) {
          parsedValue = _value;
        }
      } catch (e) {
        if (value !== 'undefined') {
          parsedValue = value;
        } else {
          console.error(`Cannot parse value ${value}.`);
        }
      }
    }
    return parsedValue;
  };

  /**
   * Parse the URL query string and return an object with all the params.
   * @param {string} queryString the query string to parse
   */
  parse = (queryString = '') => {
    const parsedParams = Qs.parse(queryString, { ignoreQueryPrefix: true });
    const params = {};
    Object.entries(parsedParams).forEach(entry => {
      const key = entry[0];
      const value = entry[1];
      params[key] = this._sanitizeParamValue(value);
    });
    return params;
  };
}

/** Default implementation for a param validator class */
export class ParamValidator {
  /**
   * Return true if the param value is valid, false otherwise
   * @param {object} queryState the `query` state
   * @param {boolean} updateUrlQueryString a flag to push the new updated version of `query` state to the URL query string
   */
  isValid = (key, value) => true;
}

/** Object responsible to update the URL query string and parse it to update the app state */
export class UrlQueryStringHandler {
  constructor(config = {}) {
    this.urlParamsMapping = config.urlParamsMapping || {
      queryString: 'q',
      sortBy: 'sort',
      sortOrder: 'order',
      page: 'p',
      size: 's',
      layout: 'l',
      filters: 'f',
    };

    this.withHistory = config.withHistory || true;
    this.paramValidator = config.paramValidator || new ParamValidator();
    this.urlParser = config.urlParser || new UrlParser();
    this.filterSeparator = config.filterSeparator || '+';

    // build the serializer from URL params to state by flipping the url params serializer
    this.fromParamsMapping = {};
    Object.keys(this.urlParamsMapping).forEach(stateKey => {
      this.fromParamsMapping[this.urlParamsMapping[stateKey]] = stateKey;
    });
  }

  _filterToString = filter => {
    let childFilter = '';
    if (filter.length === 3) {
      childFilter = this.filterSeparator.concat(
        this._filterToString(filter[2])
      );
    }
    return `${filter[0]}:${filter[1]}${childFilter}`;
  };

  _transformQueryToUrlParams = queryState => {
    const params = {};
    Object.keys(queryState)
      .filter(stateKey => stateKey in this.urlParamsMapping)
      .filter(stateKey => {
        // filter out negative or null values
        if (
          (stateKey === 'page' || stateKey === 'size') &&
          queryState[stateKey] <= 0
        ) {
          return false;
        }
        return queryState[stateKey] !== null;
      })
      .forEach(stateKey => {
        const paramKey = this.urlParamsMapping[stateKey];
        if (stateKey === 'filters') {
          params[paramKey] = queryState[stateKey].map(filter =>
            this._filterToString(filter)
          );
        } else {
          params[paramKey] = queryState[stateKey];
        }
      });

    // will omit undefined and null values from the query
    return Qs.stringify(params, {
      addQueryPrefix: true,
      skipNulls: true,
      indices: false, // for filters
    });
  };

  _filterToObj = filterStr => {
    const childAggPos = filterStr.indexOf(this.filterSeparator);
    const hasChild = childAggPos > -1;

    const aggNamePos = filterStr.indexOf(':');
    if (aggNamePos === -1) {
      return [];
    }
    const aggName = filterStr.slice(0, aggNamePos);
    const end = hasChild ? childAggPos : filterStr.length;
    const value = filterStr.slice(aggNamePos + 1, end);
    let filterList = [aggName, value];
    if (hasChild) {
      const childFilter = filterStr.slice(childAggPos + 1, filterStr.length);
      filterList.push(this._filterToObj(childFilter));
    }
    return filterList;
  };

  _transformUrlParamsToQuery = urlParamsObj => {
    const result = {};
    Object.keys(urlParamsObj).forEach(paramKey => {
      if (this.paramValidator.isValid(paramKey, urlParamsObj[paramKey])) {
        const queryStateKey = this.fromParamsMapping[paramKey];
        if (queryStateKey === 'filters') {
          if (!Array.isArray(urlParamsObj[paramKey])) {
            urlParamsObj[paramKey] = [urlParamsObj[paramKey]];
          }

          result[queryStateKey] = urlParamsObj[paramKey].map(filter =>
            this._filterToObj(filter)
          );
        } else {
          result[queryStateKey] = urlParamsObj[paramKey];
        }
      }
    });
    return result;
  };

  _mergeParamsIntoState = (urlStateObj, queryState) => {
    const _queryState = _cloneDeep(queryState);
    Object.keys(urlStateObj).forEach(stateKey => {
      if (stateKey in _queryState) {
        _queryState[stateKey] = urlStateObj[stateKey];
      }
    });
    return _queryState;
  };

  /**
   * Return a new version of the given `query` state with updated values parsed from the URL query string.
   * @param {object} queryState the `query` state
   */
  get = queryState => {
    const urlParamsObj = this.urlParser.parse(window.location.search);
    const urlStateObj = this._transformUrlParamsToQuery(urlParamsObj);
    const newQueryState = this._mergeParamsIntoState(urlStateObj, queryState);
    const newUrlParams = this._transformQueryToUrlParams(newQueryState);
    replaceHistory(newUrlParams);
    return newQueryState;
  };

  /**
   * Update the URL query string parameters from the given `query` state
   * @param {object} stateQuery the `query` state
   */
  set = stateQuery => {
    const newUrlParams = this._transformQueryToUrlParams(stateQuery);
    this.withHistory ? pushHistory(newUrlParams) : replaceHistory(newUrlParams);
  };
}
