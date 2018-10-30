import {
  SET_QUERY_STRING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_PAGINATION_PAGE,
  SET_QUERY_PAGINATION_SIZE,
  SET_QUERY_AGGREGATION,
  SET_STATE_FROM_URL,
} from '@app/state/types';
import { processNewAggregationState } from '../selectors';

const defaultState = {
  queryString: '',
  sortBy: undefined,
  sortOrder: undefined,
  page: 1, // ??? set to 0 when default set by the component
  size: 10, // ??? set to 0 when default set by the component
  aggregations: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_QUERY_STRING:
      return { ...state, queryString: action.payload };
    case SET_QUERY_SORT_BY:
      return {
        ...state,
        ...action.payload,
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
        aggregations: processNewAggregationState(
          state.aggregations,
          action.payload
        ),
      };
    }
    case SET_STATE_FROM_URL:
      return {
        ...state,
        ...action.payload.urlState,
      };
    default:
      return state;
  }
};
