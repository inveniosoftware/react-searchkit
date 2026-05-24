/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { SET_QUERY_SORTING, SET_QUERY_SORT_BY, SET_QUERY_SORT_ORDER } from "../types";

const appReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_QUERY_SORTING:
      return {
        ...state,
        hasUserChangedSorting: true,
      };
    case SET_QUERY_SORT_BY:
      return {
        ...state,
        hasUserChangedSorting: true,
      };
    case SET_QUERY_SORT_ORDER:
      return {
        ...state,
        hasUserChangedSorting: true,
      };
    default:
      return state;
  }
};

export default appReducer;
