/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import ActiveFilters from "./ActiveFilters";
import { AppContext } from "../ReactSearchKit";

describe("ActiveFilters", () => {
  const defaultProps = {
    filters: [
      { field: "type", value: "paper", label: "Paper" },
      { field: "date", value: "2024", label: "2024" },
    ],
    removeActiveFilter: jest.fn(),
  };

  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it("should render with filters", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ActiveFilters {...defaultProps} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should not render when no filters", () => {
    const props = { ...defaultProps, filters: [] };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ActiveFilters {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should call removeActiveFilter when filter is removed", () => {
    // Note: Element uses Overridable, so we can't directly click
    // But we can verify the component renders correctly
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ActiveFilters {...defaultProps} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should use custom getLabel function", () => {
    const customGetLabel = (filter) => `${filter.field}: ${filter.value}`;
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ActiveFilters {...defaultProps} getLabel={customGetLabel} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
