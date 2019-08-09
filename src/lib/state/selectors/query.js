/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import Qs from 'qs';

/**
 * Return true if the first string starts and contains the second.
 * @param {string} first a string
 * @param {string} second a string
 */
function startsWith(first, second) {
  return first.indexOf(second) === 0;
}

/**
 * Return true if the query is not an exact match with one of the previous states and the query has a value.
 * This covers the case when the user re-selects one aggregation that was previously selected to remove it, or
 * when he selects a root aggregation (no value).
 * @param {string} query The user query
 * @param {boolean} isExactMatch true if the query matches with one of the previous states
 */
function shouldBeAddedToState(query, isExactMatch) {
  const firstKey = Object.keys(query)[0];
  return !isExactMatch && query[firstKey]['value'];
}

export const updateQueryAggregation = (query, state) => {
  if (!query) return;
  const strQuery = Qs.stringify(query);

  const strStates = state.map(stateObjQuery => Qs.stringify(stateObjQuery));

  let isExactMatch = false;
  const filtered = [];
  strStates.forEach(strState => {
    const queryMatchState = startsWith(strState, strQuery);
    const stateMatchQuery = startsWith(strQuery, strState);

    // check if it the state is exactly the query
    if (!isExactMatch) {
      isExactMatch = queryMatchState && stateMatchQuery;
    }

    // keep the current state only if there is no match with the query
    if (!queryMatchState && !stateMatchQuery) {
      filtered.push(strState);
    }
  });

  if (shouldBeAddedToState(query, isExactMatch)) {
    filtered.push(strQuery);
  }

  return filtered.map(stateStrQuery => Qs.parse(stateStrQuery));
};
