var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import qs from 'qs';

import { parseUrlSearch, pushHistory, is_param_valid } from './utils';

export var UrlParamsApi = function () {
  function UrlParamsApi(urlParamsSerializer, paramValidator, urlParser) {
    var _this = this;

    _classCallCheck(this, UrlParamsApi);

    this.urlParamsSerializer = urlParamsSerializer || {
      queryString: 'q',
      sortBy: 'sb',
      sortOrder: 'so',
      page: 'p',
      size: 's',
      layout: 'l'
    };
    this.paramValidator = paramValidator || is_param_valid;
    this.urlParser = urlParser || parseUrlSearch;

    // build the serializer from URL params to state
    this.stateSerializer = {};
    Object.keys(this.urlParamsSerializer).forEach(function (stateKey) {
      _this.stateSerializer[_this.urlParamsSerializer[stateKey]] = stateKey;
    });
  }

  UrlParamsApi.prototype._transformQueryToUrlParams = function _transformQueryToUrlParams(queryState) {
    var _this2 = this;

    var params = {};
    Object.keys(queryState).forEach(function (stateKey) {
      if (_this2.urlParamsSerializer.hasOwnProperty(stateKey)) {
        var paramKey = _this2.urlParamsSerializer[stateKey];
        params[paramKey] = queryState[stateKey];
      }
    });
    // will omit undefined and null values from the query
    var newQuery = qs.stringify(params, {
      addQueryPrefix: true,
      skipNulls: true
    });

    return newQuery;
  };

  UrlParamsApi.prototype._mergeParamsIntoState = function _mergeParamsIntoState(params, queryState) {
    var _this3 = this;

    var newState = _extends({}, queryState);
    Object.keys(params).forEach(function (paramKey) {
      var stateKey = _this3.stateSerializer[paramKey];
      if (_this3.paramValidator(paramKey, params[paramKey])) {
        if (newState.hasOwnProperty(stateKey)) {
          newState[stateKey] = params[paramKey];
        }
      }
    });
    return newState;
  };

  // Returns an object compatible with react-searchkit query state from current location


  UrlParamsApi.prototype.get = function get(currentQueryState, pushState) {
    var currentParams = this.urlParser(window.location.search);
    var newQueryState = this._mergeParamsIntoState(currentParams, currentQueryState);
    if (pushState) {
      this.set(newQueryState);
    }
    return newQueryState;
  };

  // Update the URL Params given a new query state


  UrlParamsApi.prototype.set = function set(newQueryState) {
    var newUrlParams = this._transformQueryToUrlParams(newQueryState);
    pushHistory(newUrlParams);
  };

  return UrlParamsApi;
}();