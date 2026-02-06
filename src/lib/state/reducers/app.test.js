/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import appReducer from "./app";

describe("appReducer", () => {
  const initialState = {
    hasUserChangedSorting: false,
    initialSortBy: null,
    initialSortOrder: null,
  };

  it("should return empty state for undefined state with unknown action", () => {
    expect(appReducer(undefined, { type: "UNKNOWN" })).toEqual({});
  });

  it("should handle SET_QUERY_SORTING action", () => {
    const action = { type: "SET_QUERY_SORTING" };
    const nextState = appReducer(initialState, action);

    expect(nextState.hasUserChangedSorting).toBe(true);
  });

  it("should handle SET_QUERY_SORT_BY action", () => {
    const action = { type: "SET_QUERY_SORT_BY" };
    const nextState = appReducer(initialState, action);

    expect(nextState.hasUserChangedSorting).toBe(true);
  });

  it("should handle SET_QUERY_SORT_ORDER action", () => {
    const action = { type: "SET_QUERY_SORT_ORDER" };
    const nextState = appReducer(initialState, action);

    expect(nextState.hasUserChangedSorting).toBe(true);
  });

  it("should maintain hasUserChangedSorting when already true", () => {
    const currentState = {
      ...initialState,
      hasUserChangedSorting: true,
    };
    const action = { type: "SET_QUERY_SORTING" };
    const nextState = appReducer(currentState, action);

    expect(nextState.hasUserChangedSorting).toBe(true);
  });

  it("should return unchanged state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const nextState = appReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it("should not mutate the existing state", () => {
    const currentState = { ...initialState };
    const action = { type: "SET_QUERY_SORTING" };
    const nextState = appReducer(currentState, action);

    expect(nextState).not.toBe(currentState);
    expect(currentState.hasUserChangedSorting).toBe(false);
  });
});
