/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import * as Types from "./index";

describe("types/index", () => {
  it("should export SET_QUERY_COMPONENT_INITIAL_STATE", () => {
    expect(Types.SET_QUERY_COMPONENT_INITIAL_STATE).toBe(
      "SET_QUERY_COMPONENT_INITIAL_STATE"
    );
  });

  it("should export SET_QUERY_STRING", () => {
    expect(Types.SET_QUERY_STRING).toBe("SET_QUERY_STRING");
  });

  it("should export SET_QUERY_SORTING", () => {
    expect(Types.SET_QUERY_SORTING).toBe("SET_QUERY_SORTING");
  });

  it("should export SET_QUERY_SORT_BY", () => {
    expect(Types.SET_QUERY_SORT_BY).toBe("SET_QUERY_SORT_BY");
  });

  it("should export SET_QUERY_SORT_ORDER", () => {
    expect(Types.SET_QUERY_SORT_ORDER).toBe("SET_QUERY_SORT_ORDER");
  });

  it("should export SET_QUERY_STATE", () => {
    expect(Types.SET_QUERY_STATE).toBe("SET_QUERY_STATE");
  });

  it("should export SET_QUERY_PAGINATION_PAGE", () => {
    expect(Types.SET_QUERY_PAGINATION_PAGE).toBe("SET_QUERY_PAGINATION_PAGE");
  });

  it("should export SET_QUERY_PAGINATION_SIZE", () => {
    expect(Types.SET_QUERY_PAGINATION_SIZE).toBe("SET_QUERY_PAGINATION_SIZE");
  });

  it("should export SET_QUERY_FILTERS", () => {
    expect(Types.SET_QUERY_FILTERS).toBe("SET_QUERY_FILTERS");
  });

  it("should export SET_QUERY_SUGGESTIONS", () => {
    expect(Types.SET_QUERY_SUGGESTIONS).toBe("SET_QUERY_SUGGESTIONS");
  });

  it("should export SET_SUGGESTION_STRING", () => {
    expect(Types.SET_SUGGESTION_STRING).toBe("SET_SUGGESTION_STRING");
  });

  it("should export CLEAR_QUERY_SUGGESTIONS", () => {
    expect(Types.CLEAR_QUERY_SUGGESTIONS).toBe("CLEAR_QUERY_SUGGESTIONS");
  });

  it("should export RESULTS_LOADING", () => {
    expect(Types.RESULTS_LOADING).toBe("RESULTS_LOADING");
  });

  it("should export RESULTS_FETCH_SUCCESS", () => {
    expect(Types.RESULTS_FETCH_SUCCESS).toBe("RESULTS_FETCH_SUCCESS");
  });

  it("should export RESULTS_FETCH_ERROR", () => {
    expect(Types.RESULTS_FETCH_ERROR).toBe("RESULTS_FETCH_ERROR");
  });

  it("should export RESULTS_UPDATE_LAYOUT", () => {
    expect(Types.RESULTS_UPDATE_LAYOUT).toBe("RESULTS_UPDATE_LAYOUT");
  });

  it("should export SET_RESULTS_COMPONENT_INITIAL_STATE", () => {
    expect(Types.SET_RESULTS_COMPONENT_INITIAL_STATE).toBe(
      "SET_RESULTS_COMPONENT_INITIAL_STATE"
    );
  });

  it("should export RESET_QUERY", () => {
    expect(Types.RESET_QUERY).toBe("RESET_QUERY");
  });
});
