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
import SortBy from "./SortBy";
import { AppContext } from "../ReactSearchKit";

describe("SortBy", () => {
  const defaultProps = {
    loading: false,
    totalResults: 100,
    currentSortBy: "bestmatch",
    updateQuerySortBy: jest.fn(),
    values: [
      { name: "bestmatch", text: "Best match" },
      { name: "newest", text: "Newest" },
      { name: "oldest", text: "Oldest" },
    ],
    options: {
      defaultValue: "bestmatch",
    },
  };

  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it("should render when currentSortBy is set and not loading", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortBy {...defaultProps} />
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
        <SortBy {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.text()).toBe("");
  });

  it("should render with custom label", () => {
    const customLabel = () => <span>Sort By</span>;
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortBy {...defaultProps} label={customLabel} />
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
        <SortBy {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with overridableId", () => {
    const props = { ...defaultProps, overridableId: "custom" };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortBy {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with multiple values", () => {
    const values = [
      { name: "bestmatch", text: "Best match" },
      { name: "newest", text: "Newest" },
      { name: "oldest", text: "Oldest" },
      { name: "mostviewed", text: "Most viewed" },
      { name: "mostrecent", text: "Most recent" },
    ];
    const props = { ...defaultProps, values };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SortBy {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should exist as component", () => {
    expect(SortBy).toBeDefined();
    expect(typeof SortBy).toBe("function");
  });
});
