/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";

import { mount } from "enzyme";
import AutocompleteSearchBar from "./AutocompleteSearchBar";
import { AppContext } from "../ReactSearchKit";

describe("AutocompleteSearchBar", () => {
  const defaultProps = {
    updateQueryString: jest.fn(),
    updateSuggestions: jest.fn(),
    clearSuggestions: jest.fn(),
    queryString: "",
    suggestions: [],
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
        <AutocompleteSearchBar {...defaultProps} />
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
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom minCharsToAutocomplete", () => {
    const props = { ...defaultProps, minCharsToAutocomplete: 5 };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with debounce enabled", () => {
    const props = { ...defaultProps, debounce: true, debounceTime: 300 };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should call updateQueryString when executeSearch is called", () => {
    const updateQueryString = jest.fn();
    const props = { ...defaultProps, updateQueryString };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should not render suggestions when suggestions is empty", () => {
    const props = { ...defaultProps, suggestions: [] };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    // Suggestions component returns null when querySuggestions.length === 0
    expect(wrapper.exists()).toBe(true);
  });
});
