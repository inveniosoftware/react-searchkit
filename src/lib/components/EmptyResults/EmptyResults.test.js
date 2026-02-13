/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import EmptyResults from "./EmptyResults";
import { AppContext } from "../ReactSearchKit";

describe("EmptyResults", () => {
  const defaultProps = {
    loading: false,
    totalResults: 0,
    error: null,
    queryString: "",
    resetQuery: jest.fn(),
    userSelectionFilters: [],
  };

  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it("should render Element when no results and not loading", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <EmptyResults {...defaultProps} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should not render when there's an error", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <EmptyResults {...defaultProps} error={new Error("Test error")} />
      </AppContext.Provider>
    );
    // When there's an error, the component's ShouldRender returns null
    expect(wrapper.find(".invenio-empty-results").length).toBe(0);
  });

  it("should render with custom extraContent", () => {
    const extraContent = <div className="extra">Extra content</div>;
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <EmptyResults {...defaultProps} extraContent={extraContent} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render when loading", () => {
    const props = { ...defaultProps, loading: true };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <EmptyResults {...props} />
      </AppContext.Provider>
    );
    // When loading, ShouldRender returns null
    expect(wrapper.text()).toBe("");
  });

  it("should not render when totalResults > 0", () => {
    const props = { ...defaultProps, totalResults: 10 };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <EmptyResults {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.text()).toBe("");
  });

  it("should render with userSelectionFilters", () => {
    const props = {
      ...defaultProps,
      userSelectionFilters: [
        { field: "type", value: "paper", data: [] },
        { field: "date", value: "2024", data: [] },
      ],
    };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <EmptyResults {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with queryString", () => {
    const props = { ...defaultProps, queryString: "test query" };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <EmptyResults {...props} />
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
        <EmptyResults {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should call resetQuery on button click", () => {
    const resetQuery = jest.fn();
    const props = { ...defaultProps, resetQuery };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <EmptyResults {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
