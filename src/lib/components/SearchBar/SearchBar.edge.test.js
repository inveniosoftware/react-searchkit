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

const buildUID = (elementId, overridableId = "") =>
  overridableId ? `${elementId}.${overridableId}` : elementId;

describe("SearchBar - edge cases", () => {
  const updateQueryString = jest.fn();
  let wrapper;

  afterEach(() => {
    if (wrapper) {
      try {
        wrapper.unmount();
      } catch (e) {
        // Ignore unmount errors
      }
      wrapper = null;
    }
  });

  it("should render with empty queryString", () => {
    wrapper = mount(
      <AppContext.Provider value={{ buildUID }}>
        <SearchBar
          queryString=""
          updateQueryString={updateQueryString}
          overridableId=""
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with long queryString", () => {
    const longQuery = "a".repeat(1000);
    wrapper = mount(
      <AppContext.Provider value={{ buildUID }}>
        <SearchBar
          queryString={longQuery}
          updateQueryString={updateQueryString}
          overridableId=""
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with overridableId", () => {
    wrapper = mount(
      <AppContext.Provider value={{ buildUID }}>
        <SearchBar
          queryString="test"
          updateQueryString={updateQueryString}
          overridableId="custom"
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom placeholder", () => {
    wrapper = mount(
      <AppContext.Provider value={{ buildUID }}>
        <SearchBar
          queryString=""
          updateQueryString={updateQueryString}
          overridableId=""
          placeholder="Search for..."
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with autofocus", () => {
    wrapper = mount(
      <AppContext.Provider value={{ buildUID }}>
        <SearchBar
          queryString=""
          updateQueryString={updateQueryString}
          overridableId=""
          autofocus
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
