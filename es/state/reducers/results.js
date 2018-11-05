var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { RESULTS_LOADING, RESULTS_FETCH_SUCCESS, RESULTS_FETCH_ERROR } from '../types';

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

export default (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case RESULTS_LOADING:
      return _extends({}, state, {
        loading: true,
        data: _extends({}, state.data)
      });
    case RESULTS_FETCH_SUCCESS:
      return {
        loading: false,
        data: _extends({}, state.data, {
          aggregations: action.payload.aggregations,
          hits: action.payload.hits,
          total: action.payload.total
        }),
        error: {}
      };
    case RESULTS_FETCH_ERROR:
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
});