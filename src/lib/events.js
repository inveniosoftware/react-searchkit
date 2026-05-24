/*
 * SPDX-FileCopyrightText: 2020-2022 CERN.
 * SPDX-License-Identifier: MIT
 */

export const onQueryChanged = (payload) => {
  var evt = new CustomEvent("queryChanged", {
    detail: payload,
  });
  window.dispatchEvent(evt);
};
