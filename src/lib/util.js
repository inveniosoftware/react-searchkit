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
 * @param {string} overridableId unique identifier passed as prop to overridable component
 * @param {string} appName the app name
 * @return {string} the unique id string with the format 'appName.elementName.overridableId'
 */
export function buildUID(elementName, overridableId='', appName = '') {
  const _overridableId = overridableId ? `.${overridableId}` : '';
  const _appName = appName ? `${appName}.` : '';

  return `${_appName}${elementName}${_overridableId}`;
}
