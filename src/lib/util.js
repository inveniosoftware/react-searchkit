/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

/**
 * Build namespaced unique identifier.
 * @param {string} elementName component element name
 * @param {string} overridableUID unique identifier passed as prop to overridable component
 */
export function buildUID(elementName, overridableUID) {
  return `${elementName}${overridableUID && `.${overridableUID}`}`;
}
