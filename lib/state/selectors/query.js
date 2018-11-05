'use strict';

exports.__esModule = true;
exports.updateQueryAggregation = undefined;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _cloneDeep2 = require('lodash/cloneDeep');

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _findIndex2 = require('lodash/findIndex');

var _findIndex3 = _interopRequireDefault(_findIndex2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startsWith(first, second) {
  return first.indexOf(second) === 0;
}

var updateQueryAggregation = exports.updateQueryAggregation = function updateQueryAggregation(query, state) {
  if (!query) return;
  var strQuery = _qs2.default.stringify(query);

  var isExactMatch = false;
  var filtered = state.map(function (stateObjQuery) {
    return _qs2.default.stringify(stateObjQuery);
  }).filter(function (stateQuery) {
    // filter out previous user selections by comparing the initial parts of the state and the query
    var queryMatchState = startsWith(stateQuery, strQuery);
    var stateMatchQuery = startsWith(strQuery, stateQuery);

    isExactMatch = queryMatchState && stateMatchQuery;
    return !queryMatchState && !stateMatchQuery;
  });

  var firstKey = Object.keys(query)[0];
  // add the user query to the state only if it was removed and it has a value
  if (!isExactMatch && query[firstKey]['value']) {
    filtered.push(strQuery);
  }

  return filtered.map(function (stateStrQuery) {
    return _qs2.default.parse(stateStrQuery);
  });
};