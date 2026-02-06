/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 * Copyright (C) 2022 NYU.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import { Dropdown } from "semantic-ui-react";
import SortOrder from "./SortOrder";
import { AppContext } from "../ReactSearchKit";

describe("SortOrder", () => {
  const defaultProps = {
    loading: false,
    currentSortOrder: "asc",
    updateQuerySortOrder: jest.fn(),
    values: [
      { value: "asc", text: "Ascending" },
      { value: "desc", text: "Descending" },
      { value: "newest", text: "Newest" },
    ],
    totalResults: 100,
  };

  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
    jest.clearAllMocks();
  });

  it("should render when not loading and has results", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} />
      </AppContext.Provider>
    );

    expect(wrapper.find(Dropdown).exists()).toBe(true);
    expect(wrapper.find(Dropdown).prop("options")).toEqual([
      { key: 0, text: "Ascending", value: "asc" },
      { key: 1, text: "Descending", value: "desc" },
      { key: 2, text: "Newest", value: "newest" },
    ]);
    expect(wrapper.find(Dropdown).prop("compact")).toBe(true);
  });

  it("should render with custom label", () => {
    const customLabel = (cmp) => <div className="custom-label">{cmp}</div>;

    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} label={customLabel} />
      </AppContext.Provider>
    );

    expect(wrapper.find(".custom-label").exists()).toBe(true);
    expect(wrapper.find(Dropdown).exists()).toBe(true);
  });

  it("should not render when loading is true", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} loading />
      </AppContext.Provider>
    );

    expect(wrapper.text()).toBe("");
    expect(wrapper.find(Dropdown).exists()).toBe(false);
  });

  it("should not render when currentSortOrder is null", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} currentSortOrder={null} />
      </AppContext.Provider>
    );

    expect(wrapper.text()).toBe("");
    expect(wrapper.find(Dropdown).exists()).toBe(false);
  });

  it("should not render when totalResults is 0", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} totalResults={0} />
      </AppContext.Provider>
    );

    expect(wrapper.text()).toBe("");
    expect(wrapper.find(Dropdown).exists()).toBe(false);
  });

  it("should not render when totalResults is negative", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} totalResults={-1} />
      </AppContext.Provider>
    );

    expect(wrapper.text()).toBe("");
    expect(wrapper.find(Dropdown).exists()).toBe(false);
  });

  it("should call updateQuerySortOrder when value changes via dropdown", () => {
    const updateQuerySortOrder = jest.fn();
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder
          {...defaultProps}
          currentSortOrder="asc"
          updateQuerySortOrder={updateQuerySortOrder}
        />
      </AppContext.Provider>
    );

    const dropdown = wrapper.find(Dropdown);
    dropdown.prop("onChange")({}, { value: "desc" });

    expect(updateQuerySortOrder).toHaveBeenCalledTimes(1);
    expect(updateQuerySortOrder).toHaveBeenCalledWith("desc");
  });

  it("should NOT call updateQuerySortOrder when same value is selected", () => {
    const updateQuerySortOrder = jest.fn();
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder
          {...defaultProps}
          currentSortOrder="asc"
          updateQuerySortOrder={updateQuerySortOrder}
        />
      </AppContext.Provider>
    );

    const dropdown = wrapper.find(Dropdown);
    dropdown.prop("onChange")({}, { value: "asc" });

    expect(updateQuerySortOrder).not.toHaveBeenCalled();
  });

  it("should render with selectOnNavigation prop", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} selectOnNavigation />
      </AppContext.Provider>
    );

    expect(wrapper.find(Dropdown).prop("selectOnNavigation")).toBe(true);
  });

  it("should use default aria label", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} />
      </AppContext.Provider>
    );

    expect(wrapper.find(Dropdown).prop("aria-label")).toBe("Sort Order");
  });

  it("should use custom aria label", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} ariaLabel="Custom Sort Order" />
      </AppContext.Provider>
    );

    expect(wrapper.find(Dropdown).prop("aria-label")).toBe("Custom Sort Order");
  });

  it("should create options with correct structure", () => {
    const values = [
      { value: "asc", text: "Ascending" },
      { value: "desc", text: "Descending" },
      { value: "newest", text: "Newest First" },
    ];

    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} values={values} />
      </AppContext.Provider>
    );

    const options = wrapper.find(Dropdown).prop("options");
    expect(options).toHaveLength(3);
    expect(options[0]).toEqual({ key: 0, text: "Ascending", value: "asc" });
    expect(options[1]).toEqual({ key: 1, text: "Descending", value: "desc" });
    expect(options[2]).toEqual({ key: 2, text: "Newest First", value: "newest" });
  });

  it("should have default value of selected option in dropdown", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} currentSortOrder="desc" />
      </AppContext.Provider>
    );

    expect(wrapper.find(Dropdown).prop("value")).toBe("desc");
  });

  it("should render with selection prop on dropdown", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} />
      </AppContext.Provider>
    );

    expect(wrapper.find(Dropdown).prop("selection")).toBe(true);
  });

  it("should render fluid when totalResults is low", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} totalResults={5} />
      </AppContext.Provider>
    );

    expect(wrapper.find(Dropdown).exists()).toBe(true);
  });

  it("should handle multiple value changes in sequence", () => {
    const updateQuerySortOrder = jest.fn();
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder
          {...defaultProps}
          currentSortOrder="asc"
          updateQuerySortOrder={updateQuerySortOrder}
        />
      </AppContext.Provider>
    );

    const dropdown = wrapper.find(Dropdown);

    dropdown.prop("onChange")({}, { value: "desc" });
    expect(updateQuerySortOrder).toHaveBeenCalledTimes(1);
    expect(updateQuerySortOrder).toHaveBeenLastCalledWith("desc");

    dropdown.prop("onChange")({}, { value: "newest" });
    expect(updateQuerySortOrder).toHaveBeenCalledTimes(2);
    expect(updateQuerySortOrder).toHaveBeenLastCalledWith("newest");
  });

  it("should handle empty values array", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} values={[]} />
      </AppContext.Provider>
    );

    expect(wrapper.find(Dropdown).exists()).toBe(true);
    expect(wrapper.find(Dropdown).prop("options")).toEqual([]);
  });

  it("should render with single option", () => {
    const singleOption = [{ value: "asc", text: "Ascending only" }];
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} values={singleOption} />
      </AppContext.Provider>
    );

    expect(wrapper.find(Dropdown).exists()).toBe(true);
    expect(wrapper.find(Dropdown).prop("options")).toEqual([
      { key: 0, text: "Ascending only", value: "asc" },
    ]);
  });

  it("should handle rapid consecutive calls to onChange with same value", () => {
    const updateQuerySortOrder = jest.fn();
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder
          {...defaultProps}
          currentSortOrder="asc"
          updateQuerySortOrder={updateQuerySortOrder}
        />
      </AppContext.Provider>
    );

    const dropdown = wrapper.find(Dropdown);

    dropdown.prop("onChange")({}, { value: "desc" });
    dropdown.prop("onChange")({}, { value: "desc" });
    dropdown.prop("onChange")({}, { value: "newest" });

    // Both "desc" calls should go through (since currentSortOrder is "asc")
    expect(updateQuerySortOrder).toHaveBeenCalledTimes(3);
    expect(updateQuerySortOrder).toHaveBeenCalledWith("desc");
    expect(updateQuerySortOrder).toHaveBeenCalledWith("newest");
  });

  it("should handle updateQuerySortOrder being called with null value", () => {
    const updateQuerySortOrder = jest.fn();
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder
          {...defaultProps}
          currentSortOrder="asc"
          updateQuerySortOrder={updateQuerySortOrder}
        />
      </AppContext.Provider>
    );

    const dropdown = wrapper.find(Dropdown);
    dropdown.prop("onChange")({}, { value: null });

    expect(updateQuerySortOrder).toHaveBeenCalledWith(null);
  });

  it("should handle very large totalResults count", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortOrder {...defaultProps} totalResults={999999999} />
      </AppContext.Provider>
    );

    expect(wrapper.find(Dropdown).exists()).toBe(true);
  });
});
