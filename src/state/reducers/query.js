/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  SET_QUERY_COMPONENT_INITIAL_STATE,
  SET_QUERY_STRING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_PAGINATION_PAGE,
  SET_QUERY_PAGINATION_SIZE,
  SET_QUERY_AGGREGATION,
  SET_STATE_FROM_URL,
  RESULTS_UPDATE_LAYOUT,
  RESET_QUERY,
} from '@app/state/types';
import { updateQueryAggregation } from '../selectors';

const initialState = {
  queryString: '',
  sortBy: null,
  sortOrder: null,
  page: -1,
  size: -1,
  aggregations: [],
  layout: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERY_STRING:
      return { ...state, queryString: action.payload, page: 1 };
    case SET_QUERY_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
        page: 1,
      };
    case SET_QUERY_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
        page: 1,
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
        page: 1,
      };
    case SET_QUERY_AGGREGATION: {
      return {
        ...state,
        page: 1,
        aggregations: updateQueryAggregation(
          action.payload,
          state.aggregations
        ),
      };
    }
    case SET_STATE_FROM_URL:
      return {
        ...state,
        ...action.payload,
      };
    case SET_QUERY_COMPONENT_INITIAL_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case RESULTS_UPDATE_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };
    case RESET_QUERY:
      return {
        ...state,
        queryString: '',
        page: 1,
        aggregations: [],
      };
    default:
      return state;
  }
};
