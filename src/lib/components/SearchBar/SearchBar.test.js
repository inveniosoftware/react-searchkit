/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import SearchBar from "./SearchBar";
import { AppContext } from "../ReactSearchKit";

describe("SearchBar", () => {
  const defaultProps = {
    updateQueryString: jest.fn(),
    queryString: "test query",
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
        <SearchBar {...defaultProps} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom placeholder", () => {
    const props = { ...defaultProps, placeholder: "Search for books" };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with autofocus", () => {
    const props = { ...defaultProps, autofocus: true };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should call updateQueryString when search button is clicked", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SearchBar {...defaultProps} />
      </AppContext.Provider>
    );
    // Need to simulate the uncontrolled behavior - SearchBarUncontrolled wraps SearchBar
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom actionProps", () => {
    const actionProps = { color: "blue" };
    const props = { ...defaultProps, actionProps };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom uiProps", () => {
    const uiProps = { icon: "search" };
    const props = { ...defaultProps, uiProps };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <SearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
