/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import Qs from "qs";
import _extend from "lodash/extend";
import _isEmpty from "lodash/isEmpty";

/** Default backend request serializer */
export class InvenioRequestSerializer {
  constructor() {
    this.serialize = this.serialize.bind(this);
  }

  _addFilter = (filter, filterUrlParams) => {
    if (!Array.isArray(filter)) {
      throw new Error(`Filter value "${filter}" in query state must be an array.`);
    }
    if (!(filter.length === 2 || filter.length === 3)) {
      throw new Error(
        `Filter value "${filter}" in query state must be an array of 2 or 3 elements`
      );
    }
    const hasChild = filter.length === 3;
    var aggName = filter[0];
    var fieldValue = filter[1];
    if (hasChild) {
      if (!Array.isArray(filter[2])) {
        throw new Error(`Filter value "${filter[2]}" in query state must be an array.`);
      }
      fieldValue = fieldValue + "::" + filter[2][1];
    }
    if (aggName in filterUrlParams) {
      filterUrlParams[aggName].push(fieldValue);
    } else {
      filterUrlParams[aggName] = [fieldValue];
    }
  };

  _addFilters = (filters) => {
    if (!Array.isArray(filters)) {
      throw new Error(`Filters query state "${filters}" must be an array.`);
    }
    /**
     * input: [
     *   [ 'type_agg', 'value1' ]
     *   [ 'type_agg', 'value2', [ 'subtype_agg', 'a value' ] ]
     * ]
     */
    const filterUrlParams = {};
    filters.forEach((filter) => {
      this._addFilter(filter, filterUrlParams);
    });
    /**
     * output: {
     *  type_agg: [ 'value1', 'value2::a value' ]
     * }
     */
    return filterUrlParams;
  };

  /**
   * Return a serialized version of the app state `query` for the API backend.
   * @param {object} stateQuery the `query` state to serialize
   */
  serialize(stateQuery) {
    const { queryString, sortBy, sortOrder, page, size, filters, hiddenParams } =
      stateQuery;

    let getParams = {};
    if (queryString !== null) {
      getParams["q"] = queryString;
    }
    if (sortBy !== null) {
      getParams["sort"] = sortBy;

      if (sortOrder !== null) {
        getParams["sort"] = sortOrder === "desc" ? `-${sortBy}` : sortBy;
      }
    }
    if (page > 0) {
      getParams["page"] = page;
    }
    if (size > 0) {
      getParams["size"] = size;
    }
    if (!_isEmpty(hiddenParams)) {
      _extend(getParams, this._addFilters(hiddenParams));
    }
    const filterParams = this._addFilters(filters);
    _extend(getParams, filterParams);

    return Qs.stringify(getParams, { arrayFormat: "repeat" });
  }
}
