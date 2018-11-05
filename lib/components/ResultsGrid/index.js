'use strict';

exports.__esModule = true;
exports.ResultsGrid = undefined;

var _store = require('../../store');

var _ResultsGrid = require('./ResultsGrid');

var _ResultsGrid2 = _interopRequireDefault(_ResultsGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResultsGrid = exports.ResultsGrid = (0, _store.connect)(function (state) {
  return {
    items: state.results.data.hits
  };
})(_ResultsGrid2.default);