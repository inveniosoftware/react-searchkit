/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2020-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import Toggle from "./Toggle";
import { AppContext } from "../ReactSearchKit";

describe("Toggle", () => {
  const defaultProps = {
    title: "Access",
    label: "Open Access",
    filterValue: ["open"],
    userSelectionFilters: [],
    updateQueryFilters: jest.fn(),
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
        <Toggle {...defaultProps} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with multiple filter values", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Toggle
          title="Access"
          label="Access Types"
          filterValue={["open", "restricted", "closed"]}
          userSelectionFilters={[]}
          updateQueryFilters={jest.fn()}
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with overridableId", () => {
    wrapper = mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Toggle {...defaultProps} overridableId="custom" />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should exist as component", () => {
    expect(Toggle).toBeDefined();
  });
});
