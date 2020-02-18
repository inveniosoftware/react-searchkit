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
  SET_QUERY_STRING,
  SET_QUERY_SORTING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_STATE,
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
  return dispatch => {
    if (searchOnInit) {
      dispatch(executeQuery({ shouldUpdateUrlQueryString: false }));
    }
  };
};

export const updateQueryString = queryString => {
  return dispatch => {
    dispatch({
      type: SET_QUERY_STRING,
      payload: queryString,
    });
    dispatch(executeQuery());
  };
};

export const updateQuerySorting = (sortByValue, sortOrderValue) => {
  return dispatch => {
    dispatch({
      type: SET_QUERY_SORTING,
      payload: { sortBy: sortByValue, sortOrder: sortOrderValue },
    });
    dispatch(executeQuery());
  };
};

export const updateQuerySortBy = sortByValue => {
  return dispatch => {
    dispatch({
      type: SET_QUERY_SORT_BY,
      payload: sortByValue,
    });
    dispatch(executeQuery());
  };
};

export const updateQuerySortOrder = sortOrderValue => {
  return dispatch => {
    dispatch({ type: SET_QUERY_SORT_ORDER, payload: sortOrderValue });
    dispatch(executeQuery());
  };
};

export const updateQueryPaginationPage = page => {
  return dispatch => {
    dispatch({ type: SET_QUERY_PAGINATION_PAGE, payload: page });
    dispatch(executeQuery());
  };
};

export const updateQueryPaginationSize = size => {
  return dispatch => {
    dispatch({ type: SET_QUERY_PAGINATION_SIZE, payload: size });
    dispatch(executeQuery());
  };
};

export const updateQueryFilters = filters => {
  return dispatch => {
    dispatch({
      type: SET_QUERY_FILTERS,
      payload: filters,
    });
    dispatch(executeQuery());
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
  return dispatch => {
    dispatch({
      type: RESET_QUERY,
    });
    dispatch(executeQuery());
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
  return dispatch => {
    dispatch({
      type: SET_SUGGESTION_STRING,
      payload: suggestionString,
    });
    dispatch(executeSuggestionQuery());
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

export const updateQueryState = queryState => {
  return dispatch => {
    dispatch({
      type: SET_QUERY_STATE,
      payload: queryState,
    });
    dispatch(executeQuery());
  };
};
