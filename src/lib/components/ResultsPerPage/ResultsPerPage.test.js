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
import ResultsPerPage from "./ResultsPerPage";
import { AppContext } from "../ReactSearchKit";

describe("ResultsPerPage", () => {
  const defaultProps = {
    loading: false,
    totalResults: 100,
    currentSize: 10,
    updateQuerySize: jest.fn(),
    values: [10, 20, 50, 100],
    options: {
      defaultValue: 10,
    },
  };

  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it("should render with default props", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsPerPage {...defaultProps} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom label", () => {
    const customLabel = () => <span>Results per page</span>;
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsPerPage {...defaultProps} label={customLabel} />
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
        <ResultsPerPage {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.text()).toBe("");
  });

  it("should render with selectOnNavigation", () => {
    const props = { ...defaultProps, selectOnNavigation: true };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsPerPage {...props} />
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
        <ResultsPerPage {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with multiple values", () => {
    const values = [5, 10, 20, 50, 100, 200];
    const props = { ...defaultProps, values };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsPerPage {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should exist as component", () => {
    expect(ResultsPerPage).toBeDefined();
    expect(typeof ResultsPerPage).toBe("function");
  });
});
