'use strict';

exports.__esModule = true;
exports.Error = undefined;

var _store = require('../../store');

var _Error = require('./Error');

var _Error2 = _interopRequireDefault(_Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error = exports.Error = (0, _store.connect)(function (state) {
  return {
    error: state.results.error,
    loading: state.results.loading
  };
})(_Error2.default);