'use strict';

exports.__esModule = true;
exports.UrlParamsProvider = undefined;

var _store = require('../../store');

var _actions = require('../../state/actions');

var _UrlParamsProvider = require('./UrlParamsProvider');

var _UrlParamsProvider2 = _interopRequireDefault(_UrlParamsProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setUrlParams: function setUrlParams(searchDefault) {
      return dispatch((0, _actions.setQueryFromUrl)(searchDefault, true));
    },
    setUrlParamsWithoutPush: function setUrlParamsWithoutPush(searchDefault) {
      return dispatch((0, _actions.setQueryFromUrl)(searchDefault, false));
    }
  };
};

var UrlParamsProvider = exports.UrlParamsProvider = (0, _store.connect)(null, mapDispatchToProps)(_UrlParamsProvider2.default);