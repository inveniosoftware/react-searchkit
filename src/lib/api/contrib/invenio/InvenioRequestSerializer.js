/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import Qs from 'qs';
import _extend from 'lodash/extend';

/** Default backend request serializer */
export class InvenioRequestSerializer {
  _addFilter = (filter, filterUrlParams) => {
    const aggName = filter[0];
    const fieldValue = filter[1];
    filterUrlParams[aggName] = fieldValue;
    const hasChild = filter.length === 3;
    if (hasChild) {
      this._addFilter(filter[2], filterUrlParams);
    }
  };

  _addFilters = filters => {
    /**
     * input: [
     *   [ 'type_agg', 'value1' ]
     *   [ 'type_agg', 'value2', [ 'subtype_agg', 'a value' ] ]
     * ]
     */
    const filterUrlParams = {};
    filters.forEach(filter => {
      this._addFilter(filter, filterUrlParams);
    });
    /**
     * output: {
     *  type_agg: 'value1'.
     *  subtype_agg: 'a value'
     * }
     */
    return filterUrlParams;
  };

  /**
   * Return a serialized version of the app state `query` for the API backend.
   * @param {object} stateQuery the `query` state to serialize
   */
  serialize = stateQuery => {
    const { queryString, sortBy, sortOrder, page, size, filters } = stateQuery;

    const getParams = {};
    if (queryString !== null) {
      getParams['q'] = queryString;
    }
    if (sortBy !== null) {
      getParams['sort'] = sortBy;

      if (sortOrder !== null) {
        getParams['sort'] = sortOrder === 'desc' ? `-${sortBy}` : sortBy;
      }
    }
    if (page > 0) {
      getParams['page'] = page;
    }
    if (size > 0) {
      getParams['size'] = size;
    }
    const filterParams = this._addFilters(filters);
    _extend(getParams, filterParams);

    return Qs.stringify(getParams, { arrayFormat: 'repeat' });
  };
}
