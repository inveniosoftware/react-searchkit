/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _isArray from "lodash/isArray";
import _isNumber from "lodash/isNumber";

/** Default implementation for a param validator class */
export class UrlParamValidator {
  /**
   * Return true if the param value is valid, false otherwise
   * @param {object} urlHandler the url handler
   * @param {string} key the parameter key
   * @param {string} value the parameter value
   */
  isValid = (urlHandler, key, value) => {
    switch (key) {
      case "queryString":
      case "sortBy":
        return true;
      case "sortOrder":
        return ["asc", "desc"].includes(value);
      case "page":
      case "size":
        return _isNumber(value) && value > 0;
      case "layout":
        return ["grid", "list"].includes(value);
      case "filters":
      case "hiddenParams": {
        const array = _isArray(value) ? value : [value];
        const cKvSep = ":",
          cChildSep = urlHandler.urlFilterSeparator;
        const pLiteral = `[^\\${cKvSep}\\${cChildSep}]*`,
          pKeyValue = `${pLiteral}\\${cKvSep}${pLiteral}`,
          pAll = `${pKeyValue}(\\${cChildSep}${pKeyValue})*`;
        const regex = new RegExp(`^${pAll}$`);
        return array.every((filter) => String(filter).match(regex));
      }
      default:
        return false;
    }
  };
}
