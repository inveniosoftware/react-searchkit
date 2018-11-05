'use strict';

exports.__esModule = true;
exports.ResultsMultiLayout = undefined;

var _store = require('../../store');

var _ResultsMultiLayout = require('./ResultsMultiLayout');

var _ResultsMultiLayout2 = _interopRequireDefault(_ResultsMultiLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResultsMultiLayout = exports.ResultsMultiLayout = (0, _store.connect)(function (state) {
  return {
    currentLayout: state.query.layout,
    loading: state.results.loading,
    totalResults: state.results.data.total,
    items: state.results.data.hits
  };
})(_ResultsMultiLayout2.default);