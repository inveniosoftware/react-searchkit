/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import * as Actions from "./index";

describe("actions/index", () => {
  it("should export setInitialState", () => {
    expect(Actions.setInitialState).toBeDefined();
  });

  it("should export onAppInitialized", () => {
    expect(Actions.onAppInitialized).toBeDefined();
  });

  it("should export updateQueryState", () => {
    expect(Actions.updateQueryState).toBeDefined();
  });

  it("should export updateQueryString", () => {
    expect(Actions.updateQueryString).toBeDefined();
  });

  it("should export updateQuerySorting", () => {
    expect(Actions.updateQuerySorting).toBeDefined();
  });

  it("should export updateQuerySortBy", () => {
    expect(Actions.updateQuerySortBy).toBeDefined();
  });

  it("should export updateQuerySortOrder", () => {
    expect(Actions.updateQuerySortOrder).toBeDefined();
  });

  it("should export updateQueryPaginationPage", () => {
    expect(Actions.updateQueryPaginationPage).toBeDefined();
  });

  it("should export updateQueryPaginationSize", () => {
    expect(Actions.updateQueryPaginationSize).toBeDefined();
  });

  it("should export updateQueryFilters", () => {
    expect(Actions.updateQueryFilters).toBeDefined();
  });

  it("should export updateResultsLayout", () => {
    expect(Actions.updateResultsLayout).toBeDefined();
  });

  it("should export resetQuery", () => {
    expect(Actions.resetQuery).toBeDefined();
  });

  it("should export executeQuery", () => {
    expect(Actions.executeQuery).toBeDefined();
  });

  it("should export updateQueryStateFromUrl", () => {
    expect(Actions.updateQueryStateFromUrl).toBeDefined();
  });

  it("should export updateSuggestions", () => {
    expect(Actions.updateSuggestions).toBeDefined();
  });

  it("should export executeSuggestionQuery", () => {
    expect(Actions.executeSuggestionQuery).toBeDefined();
  });

  it("should export clearSuggestions", () => {
    expect(Actions.clearSuggestions).toBeDefined();
  });
});
