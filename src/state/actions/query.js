import {
  SET_STATE_FROM_URL,
  SET_QUERY_STRING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_PAGINATION_PAGE,
  SET_QUERY_PAGINATION_SIZE,
  RESULTS_LOADING,
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH_ERROR,
} from '@app/state/types';

export const setQueryFromUrl = location => {
  return async (dispatch, getState) => {
    let urlParamsApi = getState().urlParamsApi;

    if (urlParamsApi) {
      let params = urlParamsApi.getUrlParams(location);
      await dispatch({
        type: SET_STATE_FROM_URL,
        payload: { urlState: params },
      });
      dispatch(_executeQuery());
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

export const _executeQuery = () => {
  return (dispatch, getState) => {
    dispatch({ type: RESULTS_LOADING });

    let apiConfig = { ...getState().apiConfig };
    let searchApi = getState().searchApi;
    let queryState = getState().query;
    searchApi
      .search(queryState, apiConfig)
      .then(response => {
        let data = searchApi.serialize(response.data);
        dispatch({
          type: RESULTS_FETCH_SUCCESS,
          payload: {
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
