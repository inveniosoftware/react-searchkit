var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { QUERY_RESET_PAGE, SET_QUERY_COMPONENT_INITIAL_STATE, SET_QUERY_STRING, SET_QUERY_SORT_BY, SET_QUERY_SORT_ORDER, SET_QUERY_PAGINATION_PAGE, SET_QUERY_PAGINATION_SIZE, SET_QUERY_AGGREGATION, SET_STATE_FROM_URL, RESULTS_UPDATE_LAYOUT } from '../types';
import { updateQueryAggregation } from '../selectors';

var defaultState = {
  queryString: '',
  sortBy: undefined,
  sortOrder: undefined,
  page: 1,
  size: 10,
  aggregations: [],
  layout: 'list'
};

export default (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case SET_QUERY_STRING:
      return _extends({}, state, { queryString: action.payload });
    case SET_QUERY_SORT_BY:
      return _extends({}, state, {
        sortBy: action.payload
      });
    case SET_QUERY_SORT_ORDER:
      return _extends({}, state, {
        sortOrder: action.payload
      });
    case SET_QUERY_PAGINATION_PAGE:
      return _extends({}, state, {
        page: action.payload
      });
    case SET_QUERY_PAGINATION_SIZE:
      return _extends({}, state, {
        size: action.payload
      });
    case SET_QUERY_AGGREGATION:
      {
        return _extends({}, state, {
          aggregations: updateQueryAggregation(action.payload, state.aggregations)
        });
      }
    case SET_STATE_FROM_URL:
      return _extends({}, state, action.payload);
    case SET_QUERY_COMPONENT_INITIAL_STATE:
      return _extends({}, state, action.payload);
    case QUERY_RESET_PAGE:
      return _extends({}, state, {
        page: 1
      });
    case RESULTS_UPDATE_LAYOUT:
      return _extends({}, state, {
        layout: action.payload
      });
    default:
      return state;
  }
});