'use strict';

exports.__esModule = true;
exports.EmptyResults = undefined;

var _store = require('../../store');

var _EmptyResults = require('./EmptyResults');

var _EmptyResults2 = _interopRequireDefault(_EmptyResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmptyResults = exports.EmptyResults = (0, _store.connect)(function (state) {
  return {
    total: state.results.data.total,
    loading: state.results.loading,
    error: state.results.error
  };
})(_EmptyResults2.default);