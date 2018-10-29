import {
  SET_QUERY_STRING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_PAGINATION_PAGE,
  SET_QUERY_PAGINATION_SIZE,
  SET_QUERY_AGGREGATION,
  SET_STATE_FROM_URL,
} from '@app/state/types';

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
      // simple way to copy SMALL objects
      let newState = JSON.parse(JSON.stringify(state.aggregations || {}));
      const actionField = action.payload.field;
      const actionValue = action.payload.value;
      // if not present just add it
      if (!(actionField in newState)) {
        newState[actionField] = [actionValue];
      } // else, add or remove it from the list
      else {
        const aggrState = newState[actionField];
        if (aggrState.indexOf(actionValue) === -1) {
          newState[actionField].push(actionValue);
        } else {
          newState[actionField] = aggrState.filter(
            value => value !== actionValue
          );
        }
      }

      return {
        ...state,
        aggregations: newState,
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
