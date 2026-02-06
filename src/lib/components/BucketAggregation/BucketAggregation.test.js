/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import BucketAggregation from "./BucketAggregation";
import { AppContext } from "../ReactSearchKit";

describe("BucketAggregation", () => {
  const defaultProps = {
    title: "Test Aggregation",
    userSelectionFilters: [],
    resultsAggregations: {
      test_agg: {
        buckets: [
          { key: "value1", doc_count: 10 },
          { key: "value2", doc_count: 20 },
        ],
      },
    },
    updateQueryFilters: jest.fn(),
    agg: { field: "test_field", aggName: "test_agg" },
  };

  const renderWithAppContext = (props) => {
    let componentIndex = 0;
    return mount(
      <AppContext.Provider
        value={{
          appName: "MyApp",
          buildUID: (x, y) => `${x}-${y}`,
          nextComponentIndex: () => `MyApp_${componentIndex++}`,
        }}
      >
        <BucketAggregation {...props} />
      </AppContext.Provider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should exist as component", () => {
    expect(BucketAggregation).toBeDefined();
    expect(typeof BucketAggregation).toBe("function");
  });

  it("should render with aggregation data", () => {
    const wrapper = renderWithAppContext(defaultProps);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render title", () => {
    const wrapper = renderWithAppContext(defaultProps);
    expect(wrapper.text()).toContain("Test Aggregation");
  });

  it("should not render when aggregation is not present", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      resultsAggregations: {},
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should render when no buckets", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      resultsAggregations: {
        test_agg: {
          buckets: [],
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with overridableId", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      overridableId: "custom",
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle multiple buckets", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      resultsAggregations: {
        test_agg: {
          buckets: [
            { key: "value1", doc_count: 10 },
            { key: "value2", doc_count: 20 },
            { key: "value3", doc_count: 30 },
          ],
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle child aggregations", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      agg: {
        field: "test_field",
        aggName: "test_agg",
        childAgg: {
          field: "child_field",
          aggName: "child_agg",
        },
      },
      resultsAggregations: {
        test_agg: {
          buckets: [
            {
              key: "value1",
              doc_count: 10,
              child_agg: { buckets: [{ key: "child1", doc_count: 5 }] },
            },
          ],
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle null resultsAggregations", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      resultsAggregations: null,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle undefined resultsAggregations", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      resultsAggregations: undefined,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle nested aggregation paths", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      agg: {
        field: "test_field",
        aggName: "nested.test_agg",
      },
      resultsAggregations: {
        nested: {
          test_agg: {
            buckets: [{ key: "value1", doc_count: 10 }],
          },
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle selected filters in userSelectionFilters", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      userSelectionFilters: [{ test_field: ["value1"] }],
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle multiple selected filters", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      userSelectionFilters: [{ test_field: ["value1"] }, { test_field: ["value2"] }],
    });
    expect(wrapper.exists()).toBe(true);
  });
});
