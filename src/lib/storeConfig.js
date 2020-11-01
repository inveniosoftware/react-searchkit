/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

export const INITIAL_QUERY_STATE = {
  queryString: '',
  suggestions: [],
  sortBy: null,
  sortOrder: null,
  page: -1,
  size: -1,
  filters: [],
  hiddenParams: [],
  layout: null,
};

export const INITIAL_QUERY_STATE_KEYS = Object.keys(INITIAL_QUERY_STATE);

export const INITIAL_RESULTS_STATE = {
  loading: false,
  data: {
    hits: [],
    total: 0,
    aggregations: {},
  },
  error: {},
};

export const INITIAL_APP_STATE = {
  hasUserChangedSorting: false,
  initialSortBy: null,
  initialSortOrder: null,
};
