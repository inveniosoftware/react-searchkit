import {
  SET_QUERY_STRING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_QUERY_STRING:
      return { ...state, queryString: action.payload };
    case SET_QUERY_SORT_BY:
      return {
        ...state,
        sorting: {
          ...state.sorting,
          sortBy: action.payload,
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
    default:
      return state;
  }
};
