/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import Count from "./Count";
import { AppContext } from "../ReactSearchKit";

describe("Count", () => {
  it("should render with default label", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Count loading={false} totalResults={100} />
      </AppContext.Provider>
    );
    expect(wrapper.text()).toContain("100");
    wrapper.unmount();
  });

  it("should render custom label", () => {
    const customLabel = (element) => `Found ${element.props.totalResults} items`;
    const wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Count loading={false} totalResults={50} label={customLabel} />
      </AppContext.Provider>
    );
    expect(wrapper.text()).toContain("50");
    wrapper.unmount();
  });

  it("should not render when loading", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Count loading totalResults={0} />
      </AppContext.Provider>
    );
    // When loading, ShouldRender returns null
    expect(wrapper.text()).toBe("");
    wrapper.unmount();
  });

  it("should not render when totalResults is 0", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Count loading={false} totalResults={0} />
      </AppContext.Provider>
    );
    // When totalResults is 0, ShouldRender returns null due to totalResults > 0 condition
    expect(wrapper.text()).toBe("");
    wrapper.unmount();
  });

  it("should handle large result counts", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Count loading={false} totalResults={999999} />
      </AppContext.Provider>
    );
    // The component uses toLocaleString("en-US") which adds commas
    expect(wrapper.text()).toContain("999,999");
    wrapper.unmount();
  });

  it("should be overridable component", () => {
    expect(Count).toBeDefined();
    expect(typeof Count).toBe("function");
  });
});
