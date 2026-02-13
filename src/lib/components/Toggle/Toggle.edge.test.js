/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2020-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow } from "enzyme";
import Toggle from "./Toggle";
import { AppContext } from "../ReactSearchKit";

describe("Toggle Edge Cases", () => {
  let updateQueryFilters;
  let buildUID;

  beforeEach(() => {
    updateQueryFilters = jest.fn();
    buildUID = (componentName, elementId) =>
      `${componentName}-${elementId || ""}`;
  });

  afterEach(() => {
    updateQueryFilters.mockClear();
  });

  const defaultProps = {
    filterValue: ["test-value"],
    userSelectionFilters: [],
    updateQueryFilters,
  };

  it("should render correctly with required props", () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <Toggle
          {...defaultProps}
          title="Test Toggle"
          label="Test Label"
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with null defaultValue", () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <Toggle
          {...defaultProps}
          title="Test Toggle"
          label="Test Label"
          defaultValue={null}
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with undefined defaultValue", () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <Toggle
          {...defaultProps}
          title="Test Toggle"
          label="Test Label"
          defaultValue={undefined}
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom overridableId", () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <Toggle
          {...defaultProps}
          title="Test Toggle"
          label="Test Label"
          overridableId="custom-toggle"
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render without label prop", () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <Toggle
          {...defaultProps}
          title="Test Toggle"
          label={null}
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
