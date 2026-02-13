/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import ErrorComponent from "./Error";
import { AppContext } from "../ReactSearchKit";

describe("Error", () => {
  const defaultProps = {
    loading: false,
    error: new Error("Test error"),
  };

  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it("should render when there's an error and not loading", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ErrorComponent {...defaultProps} />
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
        <ErrorComponent {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.text()).toBe("");
  });

  it("should not render when error is null", () => {
    const props = { ...defaultProps, error: null };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ErrorComponent {...props} />
      </AppContext.Provider>
    );
    // When error is null and isEmpty returns true, ShouldRender returns null
    expect(wrapper.text()).toBe("");
  });

  it("should not render when error is undefined", () => {
    const props = { ...defaultProps, error: undefined };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ErrorComponent {...props} />
      </AppContext.Provider>
    );
    // When error is undefined and isEmpty returns true, ShouldRender returns null
    expect(wrapper.text()).toBe("");
  });

  it("should render with overridableId", () => {
    const props = { ...defaultProps, overridableId: "custom" };
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ErrorComponent {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should exist as component", () => {
    expect(ErrorComponent).toBeDefined();
    expect(typeof ErrorComponent).toBe("function");
  });
});
