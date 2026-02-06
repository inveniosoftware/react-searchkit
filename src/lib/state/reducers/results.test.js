/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import resultsReducer from "./results";

describe("resultsReducer", () => {
  const initialState = {
    loading: false,
    data: {
      hits: [],
      total: 0,
      aggregations: {},
    },
    error: {},
  };

  it("should return empty state for undefined state with unknown action", () => {
    expect(resultsReducer(undefined, { type: "UNKNOWN" })).toEqual({});
  });

  it("should handle RESULTS_LOADING action", () => {
    const action = { type: "RESULTS_LOADING" };
    const nextState = resultsReducer(initialState, action);

    expect(nextState.loading).toBe(true);
    expect(nextState.data).toEqual({ hits: [], total: 0, aggregations: {} });
    expect(nextState.error).toEqual({});
  });

  it("should handle RESULTS_FETCH_SUCCESS action", () => {
    const data = {
      hits: [
        { id: 1, title: "Result 1" },
        { id: 2, title: "Result 2" },
      ],
      total: 2,
      aggregations: { type: { buckets: [] } },
    };
    const action = { type: "RESULTS_FETCH_SUCCESS", payload: data };
    const nextState = resultsReducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.data).toEqual(data);
    expect(nextState.error).toEqual({});
  });

  it("should handle RESULTS_FETCH_SUCCESS with empty results", () => {
    const data = {
      hits: [],
      total: 0,
      aggregations: {},
    };
    const action = { type: "RESULTS_FETCH_SUCCESS", payload: data };
    const nextState = resultsReducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.data.hits).toEqual([]);
    expect(nextState.data.total).toBe(0);
  });

  it("should handle RESULTS_FETCH_ERROR action", () => {
    const error = new Error("Test error");
    const action = { type: "RESULTS_FETCH_ERROR", payload: { error } };
    const nextState = resultsReducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.data).toEqual({
      hits: [],
      total: 0,
      aggregations: {},
    });
    expect(nextState.error).toEqual(error);
  });

  it("should handle RESULTS_FETCH_ERROR with custom error", () => {
    const error = { message: "API Error", status: 500 };
    const action = { type: "RESULTS_FETCH_ERROR", payload: { error } };
    const nextState = resultsReducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toEqual(error);
  });

  it("should return unchanged state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const nextState = resultsReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it("should not mutate the existing state", () => {
    const currentState = { ...initialState };
    const action = { type: "RESULTS_LOADING" };
    const nextState = resultsReducer(currentState, action);

    expect(nextState).not.toBe(currentState);
    expect(currentState.loading).toBe(false);
  });
});
