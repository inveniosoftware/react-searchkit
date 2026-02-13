/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import ResultsMultiLayout from "./ResultsMultiLayout";
import { AppContext } from "../ReactSearchKit";

describe("ResultsMultiLayout", () => {
  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("should render when loading", () => {
    const props = {
      loading: true,
      currentLayout: "list",
      totalResults: 0,
    };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsMultiLayout {...props}>
          <div>Content</div>
        </ResultsMultiLayout>
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should exist and not render when currentLayout is null", () => {
    const props = {
      loading: false,
      currentLayout: null,
      totalResults: 10,
    };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsMultiLayout {...props}>
          <div>Content</div>
        </ResultsMultiLayout>
      </AppContext.Provider>
    );
    // When currentLayout is null, ShouldRender returns null
    expect(wrapper.text()).toBe("");
  });

  it("should exist when totalResults is 0", () => {
    const props = {
      loading: false,
      currentLayout: "list",
      totalResults: 0,
    };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsMultiLayout {...props}>
          <div>Content</div>
        </ResultsMultiLayout>
      </AppContext.Provider>
    );
    // When totalResults is 0, ShouldRender returns null (totalResults > 0 condition)
    expect(wrapper.text()).toBe("");
  });

  it("should exist when loading and totalResults > 0", () => {
    const props = {
      loading: true,
      currentLayout: "list",
      totalResults: 10,
    };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsMultiLayout {...props}>
          <div>Content</div>
        </ResultsMultiLayout>
      </AppContext.Provider>
    );
    // When loading, ShouldRender returns null
    expect(wrapper.text()).toBe("");
  });
});
