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
import Sort from "./Sort";
import { AppContext } from "../ReactSearchKit";

describe("Sort", () => {
  const defaultProps = {
    loading: false,
    currentSortBy: "bestmatch",
    currentSortOrder: "asc",
    updateQuerySorting: jest.fn(),
    values: [
      { name: "bestmatch", text: "Best match" },
      { name: "newest", text: "Newest" },
    ],
    sortOrderValues: [
      { name: "asc", text: "Ascending" },
      { name: "desc", text: "Descending" },
    ],
    options: {
      defaultValue: "bestmatch",
      defaultValueOrder: "asc",
    },
  };

  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it("should render", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Sort {...defaultProps} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom label", () => {
    const customLabel = () => <span>Sort By</span>;
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Sort {...defaultProps} label={customLabel} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should not render when loading", () => {
    const props = { ...defaultProps, loading: true };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Sort {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.text()).toBe("");
  });

  it("should render with overridableId", () => {
    const props = { ...defaultProps, overridableId: "custom" };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Sort {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with selectOnNavigation", () => {
    const props = { ...defaultProps, selectOnNavigation: true };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Sort {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with multiple sort values", () => {
    const values = [
      { name: "bestmatch", text: "Best match" },
      { name: "newest", text: "Newest" },
      { name: "oldest", text: "Oldest" },
      { name: "mostviewed", text: "Most viewed" },
    ];
    const props = { ...defaultProps, values };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Sort {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should exist as component", () => {
    expect(Sort).toBeDefined();
    expect(typeof Sort).toBe("function");
  });
});

// Additional tests to improve coverage
describe("Sort - additional test scenarios for component interaction", () => {
  const defaultProps = {
    loading: false,
    currentSortBy: "bestmatch",
    currentSortOrder: "asc",
    updateQuerySorting: jest.fn(),
    values: [
      { name: "bestmatch", text: "Best match" },
      { name: "newest", text: "Newest" },
    ],
    sortOrderValues: [
      { name: "asc", text: "Ascending" },
      { name: "desc", text: "Descending" },
    ],
    options: {
      defaultValue: "bestmatch",
      defaultValueOrder: "asc",
    },
    totalResults: 10,
  };

  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  describe("Element component coverage (lines 113-136)", () => {
    it("should have correct selected value in Dropdown with sortBy and sortOrder", () => {
      const props = {
        ...defaultProps,
        currentSortBy: "newest",
        currentSortOrder: "desc",
        values: [
          { name: "newest", sortBy: "newest", sortOrder: "desc", text: "Newest" },
        ],
      };

      wrapper = mount(
        <AppContext.Provider
          value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
        >
          <Sort {...props} />
        </AppContext.Provider>
      );

      const dropdown = wrapper.find("Dropdown");
      expect(dropdown.prop("value")).toBe("newest-desc");
    });

    it("should map Dropdown options correctly", () => {
      const props = {
        ...defaultProps,
        values: [
          { name: "bestmatch", sortBy: "bestmatch", text: "Best match" },
          { name: "newest", sortBy: "newest", text: "Newest" },
          { name: "oldest", sortBy: "oldest", text: "Oldest" },
        ],
      };

      wrapper = mount(
        <AppContext.Provider
          value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
        >
          <Sort {...props} />
        </AppContext.Provider>
      );

      const dropdown = wrapper.find("Dropdown");
      const options = dropdown.prop("options");

      expect(options).toHaveLength(3);
      expect(options[0]).toEqual({ key: 0, text: "Best match", value: "bestmatch" });
      expect(options[1]).toEqual({ key: 1, text: "Newest", value: "newest" });
      expect(options[2]).toEqual({ key: 2, text: "Oldest", value: "oldest" });
    });

    it("should use custom ariaLabel in Dropdown", () => {
      const props = { ...defaultProps, ariaLabel: "Custom sort label" };

      wrapper = mount(
        <AppContext.Provider
          value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
        >
          <Sort {...props} />
        </AppContext.Provider>
      );

      const dropdown = wrapper.find("Dropdown");
      expect(dropdown.prop("aria-label")).toBe("Custom sort label");
    });

    it("should pass selectOnNavigation to Dropdown", () => {
      const props = { ...defaultProps, selectOnNavigation: true };

      wrapper = mount(
        <AppContext.Provider
          value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
        >
          <Sort {...props} />
        </AppContext.Provider>
      );

      const dropdown = wrapper.find("Dropdown");
      expect(dropdown.prop("selectOnNavigation")).toBe(true);
    });

    it("should handle Dropdown onChange", () => {
      const props = {
        ...defaultProps,
        values: [
          { name: "bestmatch", sortBy: "bestmatch", text: "Best match" },
          { name: "newest", sortBy: "newest", sortOrder: "desc", text: "Newest" },
        ],
      };

      wrapper = mount(
        <AppContext.Provider
          value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
        >
          <Sort {...props} />
        </AppContext.Provider>
      );

      const dropdown = wrapper.find("Dropdown");
      dropdown.prop("onChange")(null, { value: "newest-desc" });
      expect(props.updateQuerySorting).toHaveBeenCalledWith("newest", "desc");
    });

    it("should render Element with Overridable wrapper", () => {
      const props = { ...defaultProps, overridableId: "custom-sort" };

      wrapper = mount(
        <AppContext.Provider
          value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
        >
          <Sort {...props} />
        </AppContext.Provider>
      );

      const dropdown = wrapper.find("Dropdown");
      expect(dropdown.exists()).toBe(true);
    });
  });

  describe("onChange behavior via Dropdown", () => {
    it("should not call updateQuerySorting when same value selected", () => {
      const props = {
        ...defaultProps,
        currentSortBy: "newest",
        currentSortOrder: "desc",
        values: [
          { name: "newest", sortBy: "newest", sortOrder: "desc", text: "Newest" },
        ],
      };

      wrapper = mount(
        <AppContext.Provider
          value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
        >
          <Sort {...props} />
        </AppContext.Provider>
      );

      props.updateQuerySorting.mockClear();
      const dropdown = wrapper.find("Dropdown");
      dropdown.prop("onChange")(null, { value: "newest-desc" });
      expect(props.updateQuerySorting).not.toHaveBeenCalled();
    });

    it("should call updateQuerySorting when different value selected", () => {
      const props = {
        ...defaultProps,
        values: [
          { name: "bestmatch", sortBy: "bestmatch", text: "Best match" },
          { name: "newest", sortBy: "newest", sortOrder: "desc", text: "Newest" },
        ],
      };

      wrapper = mount(
        <AppContext.Provider
          value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
        >
          <Sort {...props} />
        </AppContext.Provider>
      );

      props.updateQuerySorting.mockClear();
      const dropdown = wrapper.find("Dropdown");
      dropdown.prop("onChange")(null, { value: "newest-desc" });
      expect(props.updateQuerySorting).toHaveBeenCalledTimes(1);
      expect(props.updateQuerySorting).toHaveBeenCalledWith("newest", "desc");
    });

    it("should handle value change without sortOrder", () => {
      const props = {
        ...defaultProps,
        currentSortOrder: null,
        values: [
          { name: "bestmatch", sortBy: "bestmatch", text: "Best match" },
          { name: "newest", sortBy: "newest", text: "Newest" },
        ],
      };

      wrapper = mount(
        <AppContext.Provider
          value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
        >
          <Sort {...props} />
        </AppContext.Provider>
      );

      props.updateQuerySorting.mockClear();
      const dropdown = wrapper.find("Dropdown");
      dropdown.prop("onChange")(null, { value: "newest" });
      expect(props.updateQuerySorting).toHaveBeenCalledWith("newest", undefined);
    });
  });
});
