'use strict';

exports.__esModule = true;
exports.ResultsList = undefined;

var _store = require('../../store');

var _ResultsList = require('./ResultsList');

var _ResultsList2 = _interopRequireDefault(_ResultsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResultsList = exports.ResultsList = (0, _store.connect)(function (state) {
  return {
    items: state.results.data.hits
  };
})(_ResultsList2.default);