import {
  SET_QUERY_STRING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_PAGINATION_PAGE,
  SET_QUERY_PAGINATION_SIZE,
  SET_STATE_FROM_URL,
  SET_NEW_URL_PARAMS,
} from '@app/state/types';

export default (state = {}, action) => {
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
    case SET_STATE_FROM_URL:
      return {
        ...state,
        ...action.payload.urlState,
        urlParams: action.payload.urlState,
      };
    case SET_NEW_URL_PARAMS:
      return { ...state, urlParams: action.payload };
    default:
      return state;
  }
};
