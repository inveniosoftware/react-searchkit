'use strict';

exports.__esModule = true;
exports.is_param_valid = exports.pushHistory = exports.parseUrlSearch = undefined;

var _isNaN2 = require('lodash/isNaN');

var _isNaN3 = _interopRequireDefault(_isNaN2);

var _isNil2 = require('lodash/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeParamValue = function sanitizeParamValue(value) {
  var parsedValue = parseInt(value);
  if ((0, _isNaN3.default)(parsedValue)) {
    try {
      var _value = JSON.parse(value);
      if (!(0, _isNil3.default)(_value)) {
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

var parseUrlSearch = exports.parseUrlSearch = function parseUrlSearch() {
  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var parsedParams = _qs2.default.parse(search, { ignoreQueryPrefix: true });
  var params = {};
  Object.entries(parsedParams).forEach(function (entry) {
    var key = entry[0];
    var value = entry[1];
    params[key] = sanitizeParamValue(value);
  });
  return params;
};

var pushHistory = exports.pushHistory = function pushHistory(query) {
  if (window.history.pushState) {
    window.history.pushState({ path: query }, '', query);
  }
};

var is_param_valid = exports.is_param_valid = function is_param_valid(key, value) {
  return true;
};