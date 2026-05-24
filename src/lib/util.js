/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

/**
 * Build namespaced unique identifier.
 * @param {string} elementName component element name
 * @param {string} overridableId unique identifier passed as prop to overridable component
 * @param {string} appName the app name
 * @return {string} the unique id string with the format 'appName.elementName.overridableId'
 */
export function buildUID(elementName, overridableId = "", appName = "") {
  const _overridableId = overridableId ? `.${overridableId}` : "";
  const _appName = appName ? `${appName}.` : "";

  return `${_appName}${elementName}${_overridableId}`;
}
