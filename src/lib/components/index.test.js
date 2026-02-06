/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import * as Components from "./index";

describe("components/index", () => {
  it("should export ActiveFilters", () => {
    expect(Components.ActiveFilters).toBeDefined();
  });

  it("should export AutocompleteSearchBar", () => {
    expect(Components.AutocompleteSearchBar).toBeDefined();
  });

  it("should export BucketAggregation", () => {
    expect(Components.BucketAggregation).toBeDefined();
  });

  it("should export Count", () => {
    expect(Components.Count).toBeDefined();
  });

  it("should export EmptyResults", () => {
    expect(Components.EmptyResults).toBeDefined();
  });

  it("should export Error", () => {
    expect(Components.Error).toBeDefined();
  });

  it("should export LayoutSwitcher", () => {
    expect(Components.LayoutSwitcher).toBeDefined();
  });

  it("should export Pagination", () => {
    expect(Components.Pagination).toBeDefined();
  });

  it("should export ReactSearchKit", () => {
    expect(Components.ReactSearchKit).toBeDefined();
  });

  it("should export AppContext", () => {
    expect(Components.AppContext).toBeDefined();
  });

  it("should export ResultsGrid", () => {
    expect(Components.ResultsGrid).toBeDefined();
  });

  it("should export ResultsList", () => {
    expect(Components.ResultsList).toBeDefined();
  });

  it("should export ResultsLoader", () => {
    expect(Components.ResultsLoader).toBeDefined();
  });

  it("should export ResultsMultiLayout", () => {
    expect(Components.ResultsMultiLayout).toBeDefined();
  });

  it("should export ResultsPerPage", () => {
    expect(Components.ResultsPerPage).toBeDefined();
  });

  it("should export SearchBar", () => {
    expect(Components.SearchBar).toBeDefined();
  });

  it("should export Sort", () => {
    expect(Components.Sort).toBeDefined();
  });

  it("should export SortBy", () => {
    expect(Components.SortBy).toBeDefined();
  });

  it("should export SortOrder", () => {
    expect(Components.SortOrder).toBeDefined();
  });

  it("should export Toggle", () => {
    expect(Components.Toggle).toBeDefined();
  });
});
