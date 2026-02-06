/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow } from "enzyme";
import Pagination from "./Pagination";

describe("Pagination - edge cases", () => {
  const updateQueryPage = jest.fn();
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    totalResults: 100,
    currentSize: 10,
    updateQueryPage,
    overridableId: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render with totalPages = 1", () => {
    const props = {
      ...defaultProps,
      totalPages: 1,
    };
    const wrapper = shallow(<Pagination {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with currentPage = 1", () => {
    const wrapper = shallow(<Pagination {...defaultProps} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with currentPage = totalPages", () => {
    const props = {
      ...defaultProps,
      currentPage: 10,
      totalPages: 10,
    };
    const wrapper = shallow(<Pagination {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with large totalPages", () => {
    const props = {
      ...defaultProps,
      totalPages: 100,
      currentPage: 50,
      totalResults: 1000,
    };
    const wrapper = shallow(<Pagination {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with totalResults = 0", () => {
    const props = {
      ...defaultProps,
      totalResults: 0,
      totalPages: 0,
      currentPage: 0,
    };
    const wrapper = shallow(<Pagination {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "custom",
    };
    const wrapper = shallow(<Pagination {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle currentSize not affecting rendering", () => {
    const props = {
      ...defaultProps,
      currentSize: 50,
    };
    const wrapper = shallow(<Pagination {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with currentPage = 0", () => {
    const props = {
      ...defaultProps,
      currentPage: 0,
    };
    const wrapper = shallow(<Pagination {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle negative currentPage gracefully", () => {
    const props = {
      ...defaultProps,
      currentPage: -1,
    };
    const wrapper = shallow(<Pagination {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom disabledPageRange prop", () => {
    const props = {
      ...defaultProps,
      disabledPageRange: 3,
    };
    const wrapper = shallow(<Pagination {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });
});
