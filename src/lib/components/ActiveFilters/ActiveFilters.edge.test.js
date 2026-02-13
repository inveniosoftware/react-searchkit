/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow } from "enzyme";
import ActiveFilters from "./ActiveFilters";

describe("ActiveFilters - edge cases", () => {
  const updateQueryFilters = jest.fn();
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  it("should render with empty userSelectionFilters", () => {
    const wrapper = shallow(
      <ActiveFilters
        userSelectionFilters={[]}
        updateQueryFilters={updateQueryFilters}
        overridableId=""
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with single filter", () => {
    const wrapper = shallow(
      <ActiveFilters
        userSelectionFilters={[["type", "publication"]]}
        updateQueryFilters={updateQueryFilters}
        overridableId=""
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with multiple filters", () => {
    const wrapper = shallow(
      <ActiveFilters
        userSelectionFilters={[
          ["type", "publication"],
          ["subtype", "article"],
        ]}
        updateQueryFilters={updateQueryFilters}
        overridableId=""
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with overridableId", () => {
    const wrapper = shallow(
      <ActiveFilters
        userSelectionFilters={[["type", "publication"]]}
        updateQueryFilters={updateQueryFilters}
        overridableId="custom"
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });
});
