import {
  SET_STATE_FROM_URL,
  SET_NEW_URL_PARAMS,
  SET_DEFAULT_FIELD_FROM_COMPONENT,
  SET_QUERY_STRING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_PAGINATION_PAGE,
  SET_QUERY_PAGINATION_SIZE,
  RESULTS_LOADING,
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH_ERROR,
} from '@app/state/types';

import _isEqual from 'lodash/isEqual';

function changeUrlParamsIfChanged(prevParams, newParams, urlApi) {
  if (!_isEqual(prevParams, newParams)) {
    let newQuery = urlApi.setUrlQuery(newParams);
    if (window.history.pushState) {
      window.history.pushState({ path: newQuery }, '', newQuery);
    }
    return true;
  }
  return false;
}

export const setQueryFromUrl = (location, searchDefault) => {
  return async (dispatch, getState) => {
    let urlParamsApi = getState().urlParamsApi;
    if (urlParamsApi) {
      let queryState = getState().query;
      let params = urlParamsApi.getUrlQuery(location);
      let newParams = urlParamsApi.checkRequiredParams(params, queryState);

      let changed = changeUrlParamsIfChanged(params, newParams, urlParamsApi);
      if (changed) {
        // retrieve new url params
        params = urlParamsApi.getUrlQuery(location);
        newParams = urlParamsApi.checkRequiredParams(params, queryState);
      }
      await dispatch({
        type: SET_STATE_FROM_URL,
        payload: { urlState: params },
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

export const _executeQuery = (refreshUrlParams = true) => {
  return (dispatch, getState) => {
    let urlParamsApi = getState().urlParamsApi;
    let apiConfig = { ...getState().apiConfig };
    let searchApi = getState().searchApi;
    let queryState = getState().query;

    if (urlParamsApi && refreshUrlParams) {
      let urlParams = getState().query.urlParams;
      let changed = changeUrlParamsIfChanged(
        urlParams,
        queryState,
        urlParamsApi
      );
      if (changed) {
        dispatch({ type: SET_NEW_URL_PARAMS, payload: queryState });
      }
    }

    dispatch({ type: RESULTS_LOADING });

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
