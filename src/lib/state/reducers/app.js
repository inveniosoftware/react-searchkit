/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
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
