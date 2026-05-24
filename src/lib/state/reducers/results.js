/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { RESULTS_FETCH_ERROR, RESULTS_FETCH_SUCCESS, RESULTS_LOADING } from "../types";

const resultsReducer = (state = {}, action) => {
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
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default resultsReducer;
