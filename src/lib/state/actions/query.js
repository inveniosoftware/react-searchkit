/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import {
  CLEAR_QUERY_SUGGESTIONS,
  RESET_QUERY,
  RESULTS_FETCH_ERROR,
  RESULTS_FETCH_SUCCESS,
  RESULTS_LOADING,
  RESULTS_UPDATE_LAYOUT,
  SET_QUERY_COMPONENT_INITIAL_STATE,
  SET_QUERY_FILTERS,
  SET_QUERY_PAGINATION_PAGE,
  SET_QUERY_PAGINATION_SIZE,
  SET_QUERY_SORTING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_STATE,
  SET_QUERY_STRING,
  SET_QUERY_SUGGESTIONS,
  SET_SUGGESTION_STRING,
} from '../types';

export const setInitialState = (initialState) => {
  return (dispatch) => {
    dispatch({
      type: SET_QUERY_COMPONENT_INITIAL_STATE,
      payload: initialState,
    });
  };
};

export const onAppInitialized = (searchOnInit) => {
  return (dispatch) => {
    if (searchOnInit) {
      dispatch(
        executeQuery({
          shouldUpdateUrlQueryString: false,
        })
      );
    }
  };
};

export const updateQueryState = (queryState) => {
  return (dispatch) => {
    dispatch({
      type: SET_QUERY_STATE,
      payload: queryState,
    });
    dispatch(executeQuery());
  };
};

export const updateQueryString = (queryString) => {
  return (dispatch) => {
    dispatch({
      type: SET_QUERY_STRING,
      payload: queryString,
    });
    dispatch(executeQuery());
  };
};

export const updateQuerySorting = (sortByValue, sortOrderValue) => {
  return (dispatch) => {
    dispatch({
      type: SET_QUERY_SORTING,
      payload: { sortBy: sortByValue, sortOrder: sortOrderValue },
    });
    dispatch(executeQuery());
  };
};

export const updateQuerySortBy = (sortByValue) => {
  return (dispatch) => {
    dispatch({
      type: SET_QUERY_SORT_BY,
      payload: sortByValue,
    });
    dispatch(executeQuery());
  };
};

export const updateQuerySortOrder = (sortOrderValue) => {
  return (dispatch) => {
    dispatch({ type: SET_QUERY_SORT_ORDER, payload: sortOrderValue });
    dispatch(executeQuery());
  };
};

export const updateQueryPaginationPage = (page) => {
  return (dispatch) => {
    dispatch({ type: SET_QUERY_PAGINATION_PAGE, payload: page });
    dispatch(executeQuery());
  };
};

export const updateQueryPaginationSize = (size) => {
  return (dispatch) => {
    dispatch({ type: SET_QUERY_PAGINATION_SIZE, payload: size });
    dispatch(executeQuery());
  };
};

export const updateQueryFilters = (filters) => {
  return (dispatch) => {
    dispatch({
      type: SET_QUERY_FILTERS,
      payload: filters,
    });
    dispatch(executeQuery());
  };
};

export const updateResultsLayout = (layout) => {
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
  return (dispatch) => {
    dispatch({
      type: RESET_QUERY,
    });
    dispatch(executeQuery());
  };
};

/**
 * Update URL parameters.
 * @param {object} queryState - current query state
 * @param {object} appConfig - app config
 * @param {boolean} shouldReplaceUrlQueryString - true if should replace the last browser history state
 * @param {boolean} shouldUpdateUrlQueryString - true if it should add a new browser history state
 */
const updateURLParameters = (
  queryState,
  appConfig,
  shouldReplaceUrlQueryString,
  shouldUpdateUrlQueryString
) => {
  const urlHandlerApi = appConfig.urlHandlerApi;
  if (urlHandlerApi) {
    if (shouldReplaceUrlQueryString) {
      urlHandlerApi.replace(queryState);
    } else if (shouldUpdateUrlQueryString) {
      urlHandlerApi.set(queryState);
    }
  }
};

/**
 * Update query state and URL args with the new query state given by the backend response.
 * @param {object} response - API response
 * @param {func} dispatch - Redux `dispath` function
 * @param {func} getState - function to get the Redux state
 * @param {object} appConfig - app config
 */
const updateQueryStateAfterResponse = (
  response,
  dispatch,
  getState,
  appConfig
) => {
  dispatch({
    type: SET_QUERY_STATE,
    payload: response.newQueryState,
  });

  const urlHandlerApi = appConfig.urlHandlerApi;
  if (urlHandlerApi) {
    // Replace the URL args with the response new query state
    const updatedQueryState = _cloneDeep(getState().query);
    urlHandlerApi.replace(updatedQueryState);
  }
  delete response.newStateQuery;
};

const updateQueryStateSorting = (queryState, appState, appConfig) => {
  const newQueryState = _cloneDeep(queryState)
  if (_isEmpty(appConfig.defaultSortingOnEmptyQueryString)) {
    return newQueryState;
  }

  const userHasChangedSorting = appState.hasUserChangedSorting || newQueryState._sortUserChanged;
  if (!userHasChangedSorting) {
    const isQueryStringEmpty = newQueryState.queryString === '';
    if (isQueryStringEmpty) {
      newQueryState.sortBy = appConfig.defaultSortingOnEmptyQueryString.sortBy;
      newQueryState.sortOrder =
        appConfig.defaultSortingOnEmptyQueryString.sortOrder;
    } else {
      newQueryState.sortBy = appState.initialSortBy;
      newQueryState.sortOrder = appState.initialSortOrder;
    }
  }

  return newQueryState;
};

/**
 * Execute search API request with current query state and update results state with response.
 * @param {object} options - `shouldUpdateUrlQueryString` and `shouldReplaceUrlQueryString` to choose if the
 *                           browser history state should be updated with the current query state.
 */
export const executeQuery = ({
  shouldUpdateUrlQueryString = true,
  shouldReplaceUrlQueryString = false,
} = {}) => {
  return async (dispatch, getState, config) => {
    const appState = getState().app;
    const oldQueryState = getState().query;
    const queryState = updateQueryStateSorting(oldQueryState, appState, config);
    const sortingChanged = !_isEqual(oldQueryState, queryState);
    if (sortingChanged) {
      dispatch({
        type: SET_QUERY_STATE,
        payload: queryState,
      });
    }

    const searchApi = config.searchApi;

    updateURLParameters(
      queryState,
      config,
      shouldReplaceUrlQueryString || (sortingChanged && !shouldUpdateUrlQueryString),
      shouldUpdateUrlQueryString
    );

    dispatch({ type: RESULTS_LOADING, payload: { queryState } });
    try {
      const response = await searchApi.search(queryState);
      if ('newQueryState' in response) {
        updateQueryStateAfterResponse(response, dispatch, getState, config);
      }

      dispatch({
        type: RESULTS_FETCH_SUCCESS,
        payload: {
          aggregations: response.aggregations,
          hits: response.hits,
          total: response.total,
          queryState,
        },
      });
    } catch (reason) {
      console.error(reason);
      dispatch({
        type: RESULTS_FETCH_ERROR,
        payload: {
          error: reason,
          queryState,
        } });
    }
  };
};

export const updateSuggestions = (suggestionString) => {
  return (dispatch) => {
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
  return (dispatch) => {
    dispatch({
      type: CLEAR_QUERY_SUGGESTIONS,
      payload: {
        suggestions: [],
      },
    });
  };
};

export const updateQueryStateFromUrl = () => {
  return (dispatch, getState, config) => {
    if (config.urlHandlerApi) {
      const newState = config.urlHandlerApi.get(config.initialQueryState);
      dispatch({
        type: SET_QUERY_STATE,
        payload: newState,
      });
      dispatch(executeQuery({ shouldReplaceUrlQueryString: true }));
    }
  };
};
