/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import ResultsLoader from "./ResultsLoader";
import { AppContext } from "../ReactSearchKit";

describe("ResultsLoader", () => {
  const defaultProps = {
    loading: true,
  };

  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("should render when loading", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsLoader {...defaultProps} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom loadingElement", () => {
    const customElement = <div className="custom-loader">Custom Loading...</div>;
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <ResultsLoader loading loadingElement={customElement} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
