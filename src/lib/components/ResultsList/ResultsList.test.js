/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { mount } from "enzyme";
import React from "react";
import ResultsList from "./ResultsList";
import { AppContext } from "../ReactSearchKit";

describe("ResultsList", () => {
  const defaultProps = {
    loading: false,
    results: [],
  };

  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("should render when not loading", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsList {...defaultProps} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with empty results", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsList {...defaultProps} results={[]} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with results", () => {
    const results = [{ id: 1, title: "Test" }];
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsList {...defaultProps} results={results} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
