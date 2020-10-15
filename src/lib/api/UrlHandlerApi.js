/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import Qs from 'qs';
import _isString from 'lodash/isString';
import _isBoolean from 'lodash/isBoolean';
import _isObject from 'lodash/isObject';
import _isNaN from 'lodash/isNaN';
import _isNil from 'lodash/isNil';
import _cloneDeep from 'lodash/cloneDeep';

const pushHistory = (query) => {
  if (window.history.pushState) {
    window.history.pushState({ path: query }, '', query);
  }
};

const replaceHistory = (query) => {
  if (window.history.replaceState) {
    window.history.replaceState({ path: query }, '', query);
  }
};

/** Default URL parser implementation */
class UrlParser {
  constructor() {
    this.parse = this.parse.bind(this);
  }

  _sanitizeParamValue = (value) => {
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
  parse(queryString = '') {
    const parsedParams = Qs.parse(queryString, { ignoreQueryPrefix: true });
    const params = {};
    Object.entries(parsedParams).forEach((entry) => {
      const key = entry[0];
      const value = entry[1];
      params[key] = this._sanitizeParamValue(value);
    });
    return params;
  }
}

/** Default implementation for a param validator class */
class UrlParamValidator {
  /**
   * Return true if the param value is valid, false otherwise
   * @param {object} queryState the `query` state
   * @param {boolean} updateUrlQueryString a flag to push the new updated version of `query` state to the URL query string
   */
  isValid = (key, value) => true;
}

/** Object responsible to update the URL query string and parse it to update the app state */
export class UrlHandlerApi {
  constructor(config = {}) {
    this.urlParamsMapping = _isObject(config.urlParamsMapping)
      ? config.urlParamsMapping
      : {
          queryString: 'q',
          sortBy: 'sort',
          sortOrder: 'order',
          page: 'p',
          size: 's',
          layout: 'l',
          filters: 'f',
          hiddenParams: 'hp',
        };

    this.keepHistory =
      config.keepHistory !== undefined ? config.keepHistory : true;
    if (!_isBoolean(this.keepHistory)) {
      throw new Error(
        `"keepHistory configuration must be a boolean, ${this.keepHistory} provided.`
      );
    }

    this.urlFilterSeparator =
      config.urlFilterSeparator !== undefined ? config.urlFilterSeparator : '+';
    if (!_isString(this.urlFilterSeparator)) {
      throw new Error(
        `"urlFilterSeparator configuration must be a string, ${this.urlFilterSeparator} provided.`
      );
    }

    this.urlParamValidator =
      config.urlParamValidator || new UrlParamValidator();
    this.urlParser = config.urlParser || new UrlParser();

    // build the serializer from URL params to Query state by flipping the urlParamsMapping
    this.fromUrlParamsMapping = {};
    Object.keys(this.urlParamsMapping).forEach((stateKey) => {
      this.fromUrlParamsMapping[this.urlParamsMapping[stateKey]] = stateKey;
    });

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.replace = this.replace.bind(this);
  }

  /**
   * Map filters from list to string that is human readable
   * [ 'type', 'photo', [ 'subtype', 'png' ]] => type:photo+subtype:png
   */
  _filterListToString = (filter) => {
    const childFilter =
      filter.length === 3
        ? this.urlFilterSeparator.concat(this._filterListToString(filter[2]))
        : '';
    return `${filter[0]}:${filter[1]}${childFilter}`;
  };

  /**
   * Map each query state field to an URL param
   */
  _mapQueryStateToUrlParams = (queryState) => {
    const params = {};
    Object.keys(queryState)
      .filter((stateKey) => stateKey in this.urlParamsMapping)
      .filter((stateKey) => {
        // filter out negative or null values
        if (
          (stateKey === 'page' || stateKey === 'size') &&
          queryState[stateKey] <= 0
        ) {
          return false;
        }
        if (stateKey === 'hiddenParams') {
          return false;
        }
        return queryState[stateKey] !== null;
      })
      .forEach((stateKey) => {
        const paramKey = this.urlParamsMapping[stateKey];
        if (stateKey === 'filters') {
          params[paramKey] = queryState[stateKey].map((filter) =>
            this._filterListToString(filter)
          );
        } else {
          params[paramKey] = queryState[stateKey];
        }
      });

    // will omit undefined and null values from the query
    return Qs.stringify(params, {
      addQueryPrefix: true,
      skipNulls: true,
      indices: false, // order for filters params is not important, remove indices
    });
  };

  /**
   * Map filters from string to list
   * type:photo+subtype:png => [ 'type', 'photo', [ 'subtype', 'png' ]]
   */
  _filterStringToList = (filterStr) => {
    const childSepPos = filterStr.indexOf(this.urlFilterSeparator);
    const hasChild = childSepPos > -1;

    const aggNamePos = filterStr.indexOf(':');
    if (aggNamePos === -1) {
      throw new Error(
        `Filter "${filterStr}" not parsable. Format expected: "<agg name>:<value>"`
      );
    }
    const aggName = filterStr.slice(0, aggNamePos);
    const end = hasChild ? childSepPos : filterStr.length;
    const value = filterStr.slice(aggNamePos + 1, end);
    let filterList = [aggName, value];
    if (hasChild) {
      const childFilter = filterStr.slice(childSepPos + 1, filterStr.length);
      filterList.push(this._filterStringToList(childFilter));
    }
    return filterList;
  };

  /**
   * Map each URL param to a query state field
   */
  _mapUrlParamsToQueryState = (urlParamsObj) => {
    const result = {};
    Object.keys(urlParamsObj).forEach((paramKey) => {
      if (this.urlParamValidator.isValid(paramKey, urlParamsObj[paramKey])) {
        const queryStateKey = this.fromUrlParamsMapping[paramKey];
        result[queryStateKey] = urlParamsObj[paramKey];
        // custom transformation for filters
        if (queryStateKey === 'filters') {
          if (!Array.isArray(urlParamsObj[paramKey])) {
            // if only 1 filter, create an array with one element
            urlParamsObj[paramKey] = [urlParamsObj[paramKey]];
          }
          result[queryStateKey] = urlParamsObj[paramKey].map((filter) =>
            this._filterStringToList(filter)
          );
        }
      }
    });
    return result;
  };

  _mergeParamsIntoState = (urlStateObj, queryState) => {
    const _queryState = _cloneDeep(queryState);
    Object.keys(urlStateObj).forEach((stateKey) => {
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
  get(queryState) {
    const urlParamsObj = this.urlParser.parse(window.location.search);
    const urlStateObj = this._mapUrlParamsToQueryState(urlParamsObj);
    const newQueryState = this._mergeParamsIntoState(urlStateObj, queryState);
    const newUrlParams = this._mapQueryStateToUrlParams(newQueryState);
    replaceHistory(newUrlParams);
    return newQueryState;
  }

  /**
   * Update the URL query string parameters from the given `query` state
   * @param {object} stateQuery the `query` state
   */
  set(stateQuery) {
    if (this.keepHistory) {
      const newUrlParams = this._mapQueryStateToUrlParams(stateQuery);
      pushHistory(newUrlParams);
    } else {
      this.replace(stateQuery);
    }
  }

  /**
   * Replace the URL query string parameters from the given `query` state
   * @param {object} stateQuery the `query` state
   */
  replace(stateQuery) {
    const newUrlParams = this._mapQueryStateToUrlParams(stateQuery);
    replaceHistory(newUrlParams);
  }
}
