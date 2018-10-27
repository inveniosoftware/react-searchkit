import {
  SET_QUERY_STRING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_PAGINATION_PAGE,
  SET_QUERY_PAGINATION_SIZE,
  SET_STATE_FROM_URL,
} from '@app/state/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_QUERY_STRING:
      return { ...state, queryString: action.payload };
    case SET_QUERY_SORT_BY:
      return {
        ...state,
        sorting: {
          sortBy: action.payload.sortBy,
          sortOrder: action.payload.sortOrder,
        },
      };
    case SET_QUERY_SORT_ORDER:
      return {
        ...state,
        sorting: {
          ...state.sorting,
          sortOrder: action.payload,
        },
      };
    case SET_QUERY_PAGINATION_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload,
        },
      };
    case SET_QUERY_PAGINATION_SIZE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          size: action.payload,
        },
      };
    case SET_STATE_FROM_URL:
      return { ...state, ...action.payload.urlState };
    default:
      return state;
  }
};
