import {
  QUERY_RESET_PAGE,
  SET_QUERY_COMPONENT_INITIAL_STATE,
  SET_QUERY_STRING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_PAGINATION_PAGE,
  SET_QUERY_PAGINATION_SIZE,
  SET_QUERY_AGGREGATION,
  SET_STATE_FROM_URL,
  RESULTS_UPDATE_LAYOUT,
} from '@app/state/types';
import { updateQueryAggregation } from '../selectors';

const defaultState = {
  queryString: '',
  sortBy: undefined,
  sortOrder: undefined,
  page: 1,
  size: 10,
  aggregations: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_QUERY_STRING:
      return { ...state, queryString: action.payload };
    case SET_QUERY_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case SET_QUERY_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
      };
    case SET_QUERY_PAGINATION_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_QUERY_PAGINATION_SIZE:
      return {
        ...state,
        size: action.payload,
      };
    case SET_QUERY_AGGREGATION: {
      return {
        ...state,
        aggregations: updateQueryAggregation(
          action.payload,
          state.aggregations
        ),
      };
    }
    case SET_STATE_FROM_URL:
      return {
        ...state,
        ...action.payload,
      };
    case SET_QUERY_COMPONENT_INITIAL_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case QUERY_RESET_PAGE:
      return {
        ...state,
        page: 1,
      };
    case RESULTS_UPDATE_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };
    default:
      return state;
  }
};
