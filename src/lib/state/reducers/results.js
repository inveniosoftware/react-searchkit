/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  RESULTS_LOADING,
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH_ERROR,
} from '../types';

export default (state = {}, action) => {
  // A completion event (success or error) should only update the state if it was
  // originally triggered by the latest request made up to that point.
  // Otherwise the result shall be ignored because there is a more recent request
  // either waiting to complete, or that has already completed.
  const isLatestRequest = action.payload && state.queryState === action.payload.queryState;
  switch (action.type) {
    case RESULTS_LOADING:
      return {
        ...state,
        loading: true,
        data: {
          ...state.data,
        },
        queryState: action.payload.queryState,
      };
    case RESULTS_FETCH_SUCCESS:
      if (isLatestRequest) {
        return {
          loading: false,
          data: {
            ...state.data,
            aggregations: action.payload.aggregations,
            hits: action.payload.hits,
            total: action.payload.total,
          },
          error: {},
        };
      } else {
        return state;
      }
    case RESULTS_FETCH_ERROR:
      if (isLatestRequest) {
        return {
          loading: false,
          data: {
            ...state.data,
            aggregations: {},
            hits: [],
            total: 0,
          },
          error: action.payload.error,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
