'use strict';

exports.__esModule = true;
exports.connect = exports.storeKey = undefined;
exports.configureStore = configureStore;

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxDevtoolsExtension = require('redux-devtools-extension');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require('./state/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storeKey = exports.storeKey = 'react-searchkit';

function configureStore(config) {
  return (0, _redux.createStore)(_reducers2.default, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk2.default.withExtraArgument(config))));
}

function connectExtended(mapStateToProps, mapDispatchToProps, mergeProps) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  options.storeKey = storeKey;
  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps, options);
}

exports.connect = connectExtended;