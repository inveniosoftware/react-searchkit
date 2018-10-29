import {
  SET_STATE_FROM_URL,
  SET_QUERY_STRING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_PAGINATION_PAGE,
  SET_QUERY_PAGINATION_SIZE,
  SET_QUERY_AGGREGATION,
  RESULTS_LOADING,
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH_ERROR,
} from '@app/state/types';

export const setQueryFromUrl = (searchDefault, pushState) => {
  return async (dispatch, getState) => {
    let urlParamsApi = getState().urlParamsApi;
    if (urlParamsApi) {
      const queryState = getState().query;
      const newStateQuery = urlParamsApi.get(queryState, pushState);
      await dispatch({
        type: SET_STATE_FROM_URL,
        payload: { urlState: newStateQuery },
      });
    }
    if (searchDefault) {
      dispatch(_executeQuery(false));
    }
  };
};

export const updateQueryString = queryString => {
  return async dispatch => {
    await dispatch({
      type: SET_QUERY_STRING,
      payload: queryString,
    });
    dispatch(_executeQuery());
  };
};

export const updateQuerySortBy = (sortByValue, sortOrderValue) => {
  return async dispatch => {
    await dispatch({
      type: SET_QUERY_SORT_BY,
      payload: { sortBy: sortByValue, sortOrder: sortOrderValue },
    });
    dispatch(_executeQuery());
  };
};

export const updateQuerySortOrder = sortOrderValue => {
  return async dispatch => {
    await dispatch({ type: SET_QUERY_SORT_ORDER, payload: sortOrderValue });
    dispatch(_executeQuery());
  };
};

export const updateQueryPaginationPage = page => {
  return async dispatch => {
    await dispatch({ type: SET_QUERY_PAGINATION_PAGE, payload: page });
    dispatch(_executeQuery());
  };
};

export const updateQueryPaginationSize = size => {
  return async dispatch => {
    await dispatch({ type: SET_QUERY_PAGINATION_SIZE, payload: size });
    dispatch(_executeQuery());
  };
};

export const updateQueryAggregation = (field, value) => {
  return async dispatch => {
    await dispatch({
      type: SET_QUERY_AGGREGATION,
      payload: {
        field: field,
        value: value,
      },
    });
    dispatch(_executeQuery());
  };
};

export const _executeQuery = (refreshUrlParams = true) => {
  return (dispatch, getState) => {
    let urlParamsApi = getState().urlParamsApi;
    let apiConfig = { ...getState().apiConfig };
    let searchApi = getState().searchApi;
    let queryState = getState().query;

    if (urlParamsApi && refreshUrlParams) {
      urlParamsApi.set(queryState);
    }

    dispatch({ type: RESULTS_LOADING });

    searchApi
      .search(queryState, apiConfig)
      .then(response => {
        let data = searchApi.serialize(response.data);
        dispatch({
          type: RESULTS_FETCH_SUCCESS,
          payload: {
            aggregations: data.aggregations,
            hits: data.hits,
            total: data.total,
          },
        });
      })
      .catch(reason => {
        dispatch({ type: RESULTS_FETCH_ERROR, payload: reason });
      });
  };
};
