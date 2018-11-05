'use strict';

exports.__esModule = true;

var _redux = require('redux');

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

var _results = require('./results');

var _results2 = _interopRequireDefault(_results);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  query: _query2.default,
  results: _results2.default
});
module.exports = exports['default'];