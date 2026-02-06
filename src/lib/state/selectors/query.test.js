/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { updateQueryFilters, updateQueryState } from "./query";

/**
 * Test scenario
 *
 * File Types [file_type]
 *  - png
 *  - pdf
 * Data Types [type]
 *  - Publication [subtype]
 *    - Article
 *    - Report [subsubtype]
 *      - Restricted reports
 *      - Public reports
 *    - Other
 *  - Image [subtype]
 *    - Figure
 *    - Drawing
 *    - Other
 *  - Software
 */

describe("queries with first level filters.", () => {
  test("query with `type: Publication` should be added when not in the state.", () => {
    const state = [["file_type", "pdf"]];
    const query = ["type", "Publication"];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "pdf"],
      ["type", "Publication"],
    ]);
  });

  test("query with `type: Publication` should be added when another `type` is already in the state.", () => {
    const state = [
      ["file_type", "pdf"],
      ["type", "Image"],
    ];
    const query = ["type", "Publication"];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication"],
    ]);
  });

  test("query with `type: Image` should remove it from the state when it is already there.", () => {
    const state = [
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication"],
    ];
    const query = ["type", "Image"];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "pdf"],
      ["type", "Publication"],
    ]);
  });

  test("query with terms that start with the same text", () => {
    const state = [
      ["file_type", "pdf"],
      ["file_type", "pdf2"],
    ];
    const query = ["file_type", "pdf"];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([["file_type", "pdf2"]]);
  });
});

describe("queries with second level filters.", () => {
  test("query with `subtype: Other` should be added when not in the state.", () => {
    const state = [
      ["file_type", "pdf"],
      ["type", "Image"],
    ];
    const query = ["type", "Publication", ["subtype", "Other"]];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Other"]],
    ]);
  });

  test("query with `type` should remove from the state any children query.", () => {
    const state = [
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Other"]],
      ["type", "Publication", ["subtype", "Report"]],
      ["type", "Publication", ["subtype", "Article"]],
    ];
    const query = ["type", "Publication"];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "pdf"],
      ["type", "Image"],
    ]);
  });

  test("query with `subtype: Other` should remove any query with the parent `type: Publication`.", () => {
    const state = [
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication"],
    ];
    const query = ["type", "Publication", ["subtype", "Other"]];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Other"]],
    ]);
  });

  test("query with `subtype: Other` should remove it from the state when it is already there.", () => {
    const state = [
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Other"]],
    ];
    const query = ["type", "Publication", ["subtype", "Other"]];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication"],
    ]);
  });

  test("query with terms that start with the same text and with children", () => {
    const state = [
      ["file_type", "pdf", ["sub_type", "image"]],
      ["file_type", "pdf2"],
    ];
    const query = ["file_type", "pdf"];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([["file_type", "pdf2"]]);
  });

  test("query with `subtype: Validation` should add it to the correct type", () => {
    const state = [
      ["file_type", "pdf"],
      ["type", "Documentation", ["subtype", "Validation"]],
    ];

    const query = ["type", "Publication", ["subtype", "Validation"]];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "pdf"],
      ["type", "Documentation", ["subtype", "Validation"]],
      ["type", "Publication", ["subtype", "Validation"]],
    ]);
  });

  test("query with `subtype: Validation` should remove it from the correct type", () => {
    const state = [
      ["file_type", "pdf"],
      ["type", "Documentation", ["subtype", "Validation"]],
      ["type", "Publication", ["subtype", "Validation"]],
    ];

    const query = ["type", "Publication", ["subtype", "Validation"]];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "pdf"],
      ["type", "Documentation", ["subtype", "Validation"]],
      ["type", "Publication"],
    ]);
  });
});

describe("queries with third level filters.", () => {
  test("query with `subsubtype: Public reports` should be added when not in the state.", () => {
    const state = [
      ["file_type", "png"],
      ["file_type", "pdf"],
      ["type", "Image"],
    ];
    const query = ["type", "Publication", ["subtype", "Report"]];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "png"],
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Report"]],
    ]);
  });

  test("query with `subtype: Report` should remove from the state any child query with `subsubtype`", () => {
    const state = [
      ["file_type", "png"],
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Report", ["subsubtype", "Restricted"]]],
      ["type", "Publication", ["subtype", "Report", ["subsubtype", "Public"]]],
    ];
    const query = ["type", "Publication", ["subtype", "Report"]];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "png"],
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication"],
    ]);
  });

  test("query with `type: Publication` should remove from the state any child query with `subtype` or `subsubtype`", () => {
    const state = [
      ["file_type", "png"],
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Report", ["subsubtype", "Restricted"]]],
    ];
    const query = ["type", "Publication"];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "png"],
      ["file_type", "pdf"],
      ["type", "Image"],
    ]);
  });

  test("query with `subsubtype: Report` should remove it from the state when it is already there.", () => {
    const state = [
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Report", ["subsubtype", "Public reports"]]],
    ];
    const query = [
      "type",
      "Publication",
      ["subtype", "Report", ["subsubtype", "Public reports"]],
    ];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Report"]],
    ]);
  });
});

describe("user clears previous selections", () => {
  const state = [
    ["type", "Publication", ["subtype", "Report", ["subsubtype", "Public"]]],
    ["file_type", "pdf"],
  ];

  test("`type` selections are removed when user unselects it", () => {
    const query = ["type", "Publication"];
    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([["file_type", "pdf"]]);
  });
});

describe("user submits multiple filters as input", () => {
  test("query with `file_type: txt` should be added when not in the state.", () => {
    const state = [];
    const query = [["file_type", "txt"]];
    const newState = updateQueryFilters(query, state);
    expect(newState).toEqual([["file_type", "txt"]]);
  });

  test("query removes existing `file_type: pdf` and adds `file_type: txt`.", () => {
    const state = [["file_type", "pdf"]];
    const query = [
      ["file_type", "pdf"],
      ["file_type", "txt"],
    ];
    const newState = updateQueryFilters(query, state);
    expect(newState).toEqual([["file_type", "txt"]]);
  });

  test("query removes existing `file_type: pdf` from state.", () => {
    const state = [["file_type", "pdf"]];
    const query = [["file_type", "pdf"]];
    const newState = updateQueryFilters(query, state);
    expect(newState).toEqual([]);
  });

  test("query with `subtype: Report` should remove from the state any child query with `subsubtype`", () => {
    const state = [
      ["file_type", "png"],
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Report", ["subsubtype", "Restricted"]]],
      ["type", "Publication", ["subtype", "Report", ["subsubtype", "Public"]]],
    ];
    const query = [["type", "Publication", ["subtype", "Report"]]];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "png"],
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication"],
    ]);
  });
  test("query with `subtype: Private reports` should remove it from state but not add the root parent.", () => {
    const state = [
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Public reports"]],
      ["type", "Publication", ["subtype", "Private reports"]],
    ];
    const query = ["type", "Publication", ["subtype", "Private reports"]];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Public reports"]],
    ]);
  });
  test("query with `subtype: Public reports` should remove it from state and add the root parent.", () => {
    const state = [
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication", ["subtype", "Public reports"]],
    ];
    const query = ["type", "Publication", ["subtype", "Public reports"]];

    const newState = updateQueryFilters(query, state);

    expect(newState).toEqual([
      ["file_type", "pdf"],
      ["type", "Image"],
      ["type", "Publication"],
    ]);
  });

  test("returns undefined when queryFilter is empty", () => {
    const result = updateQueryFilters([], []);
    expect(result).toBeUndefined();
  });
});

describe("updateQueryState", () => {
  test("picks state keys from new state", () => {
    const oldState = { queryString: "old", page: 1 };
    const newState = { queryString: "new", page: 2, sortBy: "date" };
    const storeKeys = ["queryString", "page"];

    const result = updateQueryState(oldState, newState, storeKeys);

    expect(result).toEqual({ queryString: "new", page: 2 });
  });

  test("merges filters when both old and new have filters", () => {
    const oldState = { filters: [["file_type", "pdf"]] };
    const newState = { filters: ["file_type", "txt"] };
    const storeKeys = ["filters"];

    const result = updateQueryState(oldState, newState, storeKeys);

    expect(result.filters).toEqual([
      ["file_type", "pdf"],
      ["file_type", "txt"],
    ]);
  });

  test("does not include filters when new state has no filters", () => {
    const oldState = { queryString: "test", filters: [["type", "Image"]] };
    const newState = { queryString: "new" };
    const storeKeys = ["queryString", "filters"];

    const result = updateQueryState(oldState, newState, storeKeys);

    expect(result).toEqual({ queryString: "new" });
  });
});
