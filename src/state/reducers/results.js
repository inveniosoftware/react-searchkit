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
} from '@app/state/types';

export default (state = {}, action) => {
  switch (action.type) {
    case RESULTS_LOADING:
      return {
        ...state,
        loading: true,
        data: {
          ...state.data,
        },
      };
    case RESULTS_FETCH_SUCCESS:
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
    case RESULTS_FETCH_ERROR:
      return {
        loading: false,
        data: {
          ...state.data,
          aggregations: {},
          hits: [],
          total: 0,
        },
        error: action.payload,
      };
    default:
      return state;
  }
};
