import _isNaN from 'lodash/isNaN';
import _isNil from 'lodash/isNil';
import qs from 'qs';

var sanitizeParamValue = function sanitizeParamValue(value) {
  var parsedValue = parseInt(value);
  if (_isNaN(parsedValue)) {
    try {
      var _value = JSON.parse(value);
      if (!_isNil(_value)) {
        parsedValue = _value;
      }
    } catch (e) {
      if (value !== 'undefined') {
        parsedValue = value;
      } else {
        console.error('Cannot parse value ' + value + ' for param ' + key + '.');
      }
    }
  }
  return parsedValue;
};

export var parseUrlSearch = function parseUrlSearch() {
  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var parsedParams = qs.parse(search, { ignoreQueryPrefix: true });
  var params = {};
  Object.entries(parsedParams).forEach(function (entry) {
    var key = entry[0];
    var value = entry[1];
    params[key] = sanitizeParamValue(value);
  });
  return params;
};

export var pushHistory = function pushHistory(query) {
  if (window.history.pushState) {
    window.history.pushState({ path: query }, '', query);
  }
};

export var is_param_valid = function is_param_valid(key, value) {
  return true;
};