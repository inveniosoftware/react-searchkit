/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import * as libExports from "./index";

describe("lib/index", () => {
  it("should export api module", () => {
    expect(libExports.InvenioRequestSerializer).toBeDefined();
    expect(libExports.InvenioResponseSerializer).toBeDefined();
    expect(libExports.InvenioSearchApi).toBeDefined();
    expect(libExports.InvenioSuggestionApi).toBeDefined();
    expect(libExports.OSRequestSerializer).toBeDefined();
    expect(libExports.OSResponseSerializer).toBeDefined();
    expect(libExports.OSSearchApi).toBeDefined();
    expect(libExports.UrlHandlerApi).toBeDefined();
    expect(libExports.UrlParamValidator).toBeDefined();
  });

  it("should export components", () => {
    expect(libExports.ActiveFilters).toBeDefined();
    expect(libExports.AutocompleteSearchBar).toBeDefined();
    expect(libExports.BucketAggregation).toBeDefined();
    expect(libExports.Count).toBeDefined();
    expect(libExports.EmptyResults).toBeDefined();
    expect(libExports.Error).toBeDefined();
    expect(libExports.LayoutSwitcher).toBeDefined();
    expect(libExports.Pagination).toBeDefined();
    expect(libExports.ReactSearchKit).toBeDefined();
    expect(libExports.AppContext).toBeDefined();
    expect(libExports.ResultsGrid).toBeDefined();
    expect(libExports.ResultsList).toBeDefined();
    expect(libExports.ResultsLoader).toBeDefined();
    expect(libExports.ResultsMultiLayout).toBeDefined();
    expect(libExports.ResultsPerPage).toBeDefined();
    expect(libExports.SearchBar).toBeDefined();
    expect(libExports.Sort).toBeDefined();
    expect(libExports.SortBy).toBeDefined();
    expect(libExports.SortOrder).toBeDefined();
    expect(libExports.Toggle).toBeDefined();
    expect(libExports.withState).toBeDefined();
  });

  it("should export store functions", () => {
    expect(libExports.createStoreWithConfig).toBeDefined();
  });

  it("should export events", () => {
    expect(libExports.onQueryChanged).toBeDefined();
  });

  it("should export util functions", () => {
    expect(libExports.buildUID).toBeDefined();
  });
});
