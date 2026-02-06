/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow } from "enzyme";
import SortOrder from "./SortOrder";

describe("SortOrder - edge cases", () => {
  const updateQuerySortOrder = jest.fn();
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  const defaultProps = {
    currentValue: "asc",
    totalResults: 100,
    updateQuerySortOrder,
    overridableId: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render with currentValue = 'desc'", () => {
    const props = {
      ...defaultProps,
      currentValue: "desc",
    };
    const wrapper = shallow(<SortOrder {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with currentValue = null", () => {
    const props = {
      ...defaultProps,
      currentValue: null,
    };
    const wrapper = shallow(<SortOrder {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with currentValue = undefined", () => {
    const props = {
      ...defaultProps,
      currentValue: undefined,
    };
    const wrapper = shallow(<SortOrder {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with totalResults = 0", () => {
    const props = {
      ...defaultProps,
      totalResults: 0,
    };
    const wrapper = shallow(<SortOrder {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "custom",
    };
    const wrapper = shallow(<SortOrder {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with loading = true", () => {
    const props = {
      ...defaultProps,
      loading: true,
    };
    const wrapper = shallow(<SortOrder {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });
});
