import {
  SET_QUERY_STRING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  FETCHING_RESULTS,
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH_ERROR,
} from '../types';

export const updateQueryString = queryString => {
  return dispatch => {
    dispatch({
      type: SET_QUERY_STRING,
      payload: queryString,
    });
    dispatch(_executeQuery());
  };
};

export const updateQuerySortBy = sortByValue => {
  return dispatch => {
    dispatch({ type: SET_QUERY_SORT_BY, payload: sortByValue });
    dispatch(_executeQuery());
  };
};

export const updateQuerySortOrder = sortOrderValue => {
  return dispatch => {
    dispatch({ type: SET_QUERY_SORT_ORDER, payload: sortOrderValue });
    dispatch(_executeQuery());
  };
};

export const _executeQuery = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING_RESULTS });

    let apiConfig = { ...getState().apiConfig };
    let searchApi = getState().searchApi;
    let queryState = getState().query;
    searchApi
      .search(queryState, apiConfig)
      .then(response => {
        let data = searchApi.serialize(response.data);
        dispatch({ type: RESULTS_FETCH_SUCCESS, payload: data });
      })
      .catch(reason => {
        dispatch({ type: RESULTS_FETCH_ERROR, payload: reason });
      });
  };
};
