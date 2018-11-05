'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _types = require('../types');

var defaultState = {
  loading: false,
  data: {
    hits: [],
    total: 0,
    aggregations: {},
    layout: undefined
  },
  error: {}
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _types.RESULTS_LOADING:
      return _extends({}, state, {
        loading: true,
        data: _extends({}, state.data)
      });
    case _types.RESULTS_FETCH_SUCCESS:
      return {
        loading: false,
        data: _extends({}, state.data, {
          aggregations: action.payload.aggregations,
          hits: action.payload.hits,
          total: action.payload.total
        }),
        error: {}
      };
    case _types.RESULTS_FETCH_ERROR:
      return {
        loading: false,
        data: _extends({}, state.data, {
          aggregations: {},
          hits: [],
          total: 0
        }),
        error: action.payload
      };
    default:
      return state;
  }
};

module.exports = exports['default'];