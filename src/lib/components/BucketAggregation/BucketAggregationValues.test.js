/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import BucketAggregationValues from "./BucketAggregationValues";
import { AppContext } from "../ReactSearchKit";

describe("BucketAggregationValues", () => {
  const defaultProps = {
    buckets: [
      { key: "value1", doc_count: 10 },
      { key: "value2", doc_count: 20 },
    ],
    selectedFilters: [],
    field: "test_field",
    aggName: "test_agg",
    onFilterClicked: jest.fn(),
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
        <BucketAggregationValues {...props} />
      </AppContext.Provider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should exist as component", () => {
    expect(BucketAggregationValues).toBeDefined();
    expect(typeof BucketAggregationValues).toBe("function");
  });

  it("should render bucket values", () => {
    const wrapper = renderWithAppContext(defaultProps);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("Checkbox")).toHaveLength(2);
  });

  it("should render empty buckets array", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      buckets: [],
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("Checkbox")).toHaveLength(0);
  });

  it("should mark selected bucket as checked", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      selectedFilters: [["test_agg", "value1"]],
    });
    const checkboxes = wrapper.find("Checkbox");
    expect(checkboxes.at(0).prop("checked")).toBe(true);
    expect(checkboxes.at(1).prop("checked")).toBe(false);
  });

  it("should handle multiple selected filters", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      selectedFilters: [
        ["test_agg", "value1"],
        ["test_agg", "value2"],
      ],
    });
    const checkboxes = wrapper.find("Checkbox");
    expect(checkboxes.at(0).prop("checked")).toBe(true);
    expect(checkboxes.at(1).prop("checked")).toBe(true);
  });

  it("should render with overridableId", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      overridableId: "custom",
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle single bucket", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      buckets: [{ key: "value1", doc_count: 10 }],
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("Checkbox")).toHaveLength(1);
  });

  it("should handle many buckets", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      buckets: Array.from({ length: 50 }, (_, i) => ({
        key: `value${i}`,
        doc_count: i * 10,
      })),
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle bucket with nested filters", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      selectedFilters: [["test_agg", ["value1", "nested_value"]]],
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle unselected bucket", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      selectedFilters: [["other_agg", "value1"]],
    });
    const checkboxes = wrapper.find("Checkbox");
    expect(checkboxes.at(0).prop("checked")).toBe(false);
    expect(checkboxes.at(1).prop("checked")).toBe(false);
  });

  it("should handle empty selectedFilters", () => {
    const wrapper = renderWithAppContext({
      ...defaultProps,
      selectedFilters: [],
    });
    const checkboxes = wrapper.find("Checkbox");
    expect(checkboxes.at(0).prop("checked")).toBe(false);
    expect(checkboxes.at(1).prop("checked")).toBe(false);
  });

  it("should render list container with values", () => {
    const wrapper = renderWithAppContext(defaultProps);
    expect(wrapper.find("Checkbox")).toHaveLength(2);
  });
});
