'use strict';

exports.__esModule = true;
exports.Count = undefined;

var _store = require('../../store');

var _Count = require('./Count');

var _Count2 = _interopRequireDefault(_Count);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Count = exports.Count = (0, _store.connect)(function (state) {
  return {
    total: state.results.data.total,
    loading: state.results.loading
  };
})(_Count2.default);