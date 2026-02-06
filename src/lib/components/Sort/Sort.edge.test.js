/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow } from "enzyme";
import Sort from "./Sort";

describe("Sort - edge cases", () => {
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  it("should render with totalResults = 0", () => {
    const wrapper = shallow(
      <Sort totalResults={0} overridableId="" buildUID={buildUID} />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with totalResults = 1", () => {
    const wrapper = shallow(
      <Sort totalResults={1} overridableId="" buildUID={buildUID} />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with large totalResults", () => {
    const wrapper = shallow(
      <Sort totalResults={999999} overridableId="" buildUID={buildUID} />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with overridableId", () => {
    const wrapper = shallow(
      <Sort totalResults={100} overridableId="custom" buildUID={buildUID} />
    );
    expect(wrapper.exists()).toBe(true);
  });
});
