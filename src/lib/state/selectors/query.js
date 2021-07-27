/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import Qs from 'qs';
import _head from 'lodash/head';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _pick from 'lodash/pick';

/**
 * Return true if the first string starts and contains the second.
 * @param {string} first a string
 * @param {string} second a string
 */
function startsWith(first, second) {
  return first.indexOf(second) === 0;
}

function toString(array) {
  return Qs.stringify({ q: array });
}

function parse(str) {
  return Qs.parse(str)['q'];
}

function removeLastChild(arr) {
  const hasChild = arr.length === 3;
  if (hasChild) {
    const result = [arr[0], arr[1]];
    const lastChild = removeLastChild(arr[2]);
    if (lastChild.length) {
      result.push(lastChild);
    }
    return result;
  }
  return [];
}

function updateFilter(queryFilter, stateFilters) {
  /**
   * convert query and state to strings so they can be compared
   */
  const strQuery = toString(queryFilter);
  const strStateFilters = stateFilters.map((stateObjQuery) =>
    toString(stateObjQuery)
  );

  /**
   * filter out any state that starts with the query or any parent of the query
   * e.g. query = ['file_type', 'pdf']
   *      state = [[ 'file_type', 'pdf' ]]
   *      filtered = []
   *
   *      query = [ 'type', 'publication' ]
   *      state = [['type', 'publication', ['subtype', 'report' ]]
   *      filtered = []
   *
   *      query = ['type', 'publication', ['subtype', 'report']]]
   *      state = [[ 'type', 'publication' ]]
   *      filtered = []
   */
  let anyRemoved = false;
  const filteredStrStates = strStateFilters.filter((strStateFilter) => {
    const childFilterExists = startsWith(strStateFilter, strQuery);
    const parentFilterExists = startsWith(strQuery, strStateFilter);

    if (childFilterExists && !anyRemoved) {
      anyRemoved = true;
    }
    return !childFilterExists && !parentFilterExists;
  });

  if (!anyRemoved) {
    /**
     * if nothing has been removed, it means it was not previously there, so
     * the user query has to be added.
     * e.g. query = ['type', 'publication', ['subtype', 'report']]
     *      state = []
     *      filtered = [['type', 'publication', ['subtype', 'report']]]
     */
    filteredStrStates.push(strQuery);
  } else {
    /**
     * if a filter has been removed, it might have been a child. Add its parent if it is the root parent.
     * e.g. query = ['type', 'publication', 'subtype', 'report']
     *      state = [['type', 'publication', ['subtype', 'report']]]
     *      filtered = [['type', 'publication']]
     */
    const hasChild = queryFilter.length === 3;
    if (hasChild) {
      const rootParentArr = removeLastChild(queryFilter);
      const rootParentArrStrQuery = toString(rootParentArr);
      const anotherChildFound = filteredStrStates.some((strStateFilter) => {
        const childFilterExists = startsWith(
          strStateFilter,
          rootParentArrStrQuery
        );
        const parentFilterExists = startsWith(
          rootParentArrStrQuery,
          strStateFilter
        );
        return childFilterExists || parentFilterExists;
      });
      if (_isEmpty(filteredStrStates) || !anotherChildFound) {
        filteredStrStates.push(rootParentArrStrQuery);
      }
    }
  }

  /**
   * convert back to lists
   */
  return filteredStrStates.map((strState) => parse(strState));
}

export const updateQueryFilters = (queryFilter, stateFilters) => {
  if (_isEmpty(queryFilter)) return;

  /** If we have one filter as query = ['file_type', 'pdf'] */
  if (!_isArray(_head(queryFilter))) {
    return updateFilter(queryFilter, stateFilters);
  }

  /** If we have an array of filters as query we apply the filters one by one.
   * e.g. query = [['file_type', 'pdf'], ['file_type', 'txt']]
   */
  let tempStateFilters = stateFilters;
  for (const filter of queryFilter) {
    tempStateFilters = updateFilter(filter, tempStateFilters);
  }
  return tempStateFilters;
};

export const updateQueryState = (oldState, newState, storeKeys) => {
  let pickedState = _pick(newState, storeKeys);
  if (!_isEmpty(pickedState.filters)) {
    pickedState['filters'] = updateQueryFilters(
      pickedState.filters,
      oldState.filters
    );
  }
  return pickedState;
};
