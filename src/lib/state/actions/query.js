/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _cloneDeep from 'lodash/cloneDeep';
import {
  SET_QUERY_COMPONENT_INITIAL_STATE,
  SET_QUERY_STATE_URL_EXTERNALLY_CHANGED,
  SET_QUERY_STRING,
  SET_QUERY_SORTING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_PAGINATION_PAGE,
  SET_QUERY_PAGINATION_SIZE,
  SET_QUERY_FILTERS,
  SET_QUERY_SUGGESTIONS,
  SET_SUGGESTION_STRING,
  CLEAR_QUERY_SUGGESTIONS,
  RESET_QUERY,
  RESULTS_LOADING,
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH_ERROR,
  RESULTS_UPDATE_LAYOUT,
} from '../types';

export const setInitialState = initialState => {
  return dispatch => {
    dispatch({
      type: SET_QUERY_COMPONENT_INITIAL_STATE,
      payload: initialState,
    });
  };
};

export const onAppInitialized = searchOnInit => {
  return async dispatch => {
    if (searchOnInit) {
      await dispatch(executeQuery({ shouldUpdateUrlQueryString: false }));
    }
  };
};

export const onBrowserHistoryExternallyChanged = () => {
  return async (dispatch, getState, config) => {
    const urlHandlerApi = config.urlHandlerApi;
    if (urlHandlerApi) {
      const currentStateQuery = getState().query;
      const newStateQuery = urlHandlerApi.get(currentStateQuery);
      dispatch({
        type: SET_QUERY_STATE_URL_EXTERNALLY_CHANGED,
        payload: newStateQuery,
      });
      await dispatch(
        executeQuery({
          shouldUpdateUrlQueryString: false,
          shouldReplaceUrlQueryString: true,
        })
      );
    }
  };
};

export const updateQueryString = queryString => {
  return async dispatch => {
    dispatch({
      type: SET_QUERY_STRING,
      payload: queryString,
    });

    await dispatch(executeQuery());
  };
};

export const updateQuerySorting = (sortByValue, sortOrderValue) => {
  return async dispatch => {
    dispatch({
      type: SET_QUERY_SORTING,
      payload: { sortBy: sortByValue, sortOrder: sortOrderValue },
    });
    await dispatch(executeQuery());
  };
};

export const updateQuerySortBy = sortByValue => {
  return async dispatch => {
    dispatch({
      type: SET_QUERY_SORT_BY,
      payload: sortByValue,
    });
    await dispatch(executeQuery());
  };
};

export const updateQuerySortOrder = sortOrderValue => {
  return async dispatch => {
    dispatch({ type: SET_QUERY_SORT_ORDER, payload: sortOrderValue });
    await dispatch(executeQuery());
  };
};

export const updateQueryPaginationPage = page => {
  return async dispatch => {
    dispatch({ type: SET_QUERY_PAGINATION_PAGE, payload: page });
    await dispatch(executeQuery());
  };
};

export const updateQueryPaginationSize = size => {
  return async dispatch => {
    dispatch({ type: SET_QUERY_PAGINATION_SIZE, payload: size });
    await dispatch(executeQuery());
  };
};

export const updateQueryFilters = filters => {
  return async dispatch => {
    dispatch({
      type: SET_QUERY_FILTERS,
      payload: filters,
    });
    await dispatch(executeQuery());
  };
};

export const updateResultsLayout = layout => {
  return async (dispatch, getState, config) => {
    const urlHandlerApi = config.urlHandlerApi;
    if (urlHandlerApi) {
      await dispatch({
        type: RESULTS_UPDATE_LAYOUT,
        payload: layout,
      });
      const newStateQuery = getState().query;
      urlHandlerApi.set(newStateQuery);
    } else {
      dispatch({
        type: RESULTS_UPDATE_LAYOUT,
        payload: layout,
      });
    }
  };
};

export const resetQuery = () => {
  return async dispatch => {
    dispatch({
      type: RESET_QUERY,
    });
    await dispatch(executeQuery());
  };
};

export const executeQuery = ({
  shouldUpdateUrlQueryString = true,
  shouldReplaceUrlQueryString = false,
} = {}) => {
  return async (dispatch, getState, config) => {
    const queryState = _cloneDeep(getState().query);
    const searchApi = config.searchApi;
    const urlHandlerApi = config.urlHandlerApi;

    if (urlHandlerApi) {
      if (shouldReplaceUrlQueryString) {
        urlHandlerApi.replace(queryState);
      } else if (shouldUpdateUrlQueryString) {
        urlHandlerApi.set(queryState);
      }
    }

    dispatch({ type: RESULTS_LOADING });
    try {
      const response = await searchApi.search(queryState);
      dispatch({
        type: RESULTS_FETCH_SUCCESS,
        payload: {
          aggregations: response.aggregations,
          hits: response.hits,
          total: response.total,
        },
      });
    } catch (reason) {
      console.error(reason);
      dispatch({ type: RESULTS_FETCH_ERROR, payload: reason });
    }
  };
};

export const updateSuggestions = suggestionString => {
  return async dispatch => {
    dispatch({
      type: SET_SUGGESTION_STRING,
      payload: suggestionString,
    });

    await dispatch(executeSuggestionQuery());
  };
};

export const executeSuggestionQuery = () => {
  return async (dispatch, getState, config) => {
    const queryState = _cloneDeep(getState().query);
    const suggestionApi = config.suggestionApi;

    try {
      const response = await suggestionApi.search(queryState);
      dispatch({
        type: SET_QUERY_SUGGESTIONS,
        payload: {
          suggestions: response.suggestions,
        },
      });
    } catch (reason) {
      console.error('Could not load suggestions due to: ' + reason);
    }
  };
};

export const clearSuggestions = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_QUERY_SUGGESTIONS,
      payload: {
        suggestions: [],
      },
    });
  };
};
