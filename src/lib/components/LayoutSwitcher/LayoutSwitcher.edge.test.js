/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow } from "enzyme";
import LayoutSwitcher from "./LayoutSwitcher";
import { AppContext } from "../ReactSearchKit";

describe("LayoutSwitcher Edge Cases", () => {
  const updateQueryState = jest.fn();
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  const defaultProps = {
    currentLayout: "list",
    layoutName: "item",
    updateQueryState,
    overridableId: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Default state - list layout active
  it("should render with currentLayout = 'list'", () => {
    const props = {
      ...defaultProps,
      currentLayout: "list",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 2: Grid layout active
  it("should render with currentLayout = 'grid'", () => {
    const props = {
      ...defaultProps,
      currentLayout: "grid",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 3: Custom overridableId
  it("should render with custom overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "custom-layout",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 4: Empty string overridableId
  it("should render with empty overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 5: Different layoutName values
  it("should render with layoutName = 'record'", () => {
    const props = {
      ...defaultProps,
      layoutName: "record",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 6: Different layoutName values - document
  it("should render with layoutName = 'document'", () => {
    const props = {
      ...defaultProps,
      layoutName: "document",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 7: Null updateQueryState function (edge case, may cause runtime issues)
  it("should handle null updateQueryState", () => {
    const props = {
      ...defaultProps,
      updateQueryState: null,
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 8: Undefined updateQueryState function (edge case, may cause runtime issues)
  it("should handle undefined updateQueryState", () => {
    const props = {
      ...defaultProps,
      updateQueryState: undefined,
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 9: Long overridableId string
  it("should render with long overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "custom-long-layout-switcher-id-for-testing",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 10: Special characters in overridableId
  it("should render with special characters in overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "custom.layout.switcher",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 11: Number-like string for currentLayout
  it("should render with currentLayout = '0'", () => {
    const props = {
      ...defaultProps,
      currentLayout: "0",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 12: Boolean-like string for currentLayout
  it("should render with currentLayout = 'true'", () => {
    const props = {
      ...defaultProps,
      currentLayout: "true",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 13: Mixed case currentLayout (component may treat it as different value)
  it("should render with mixed case currentLayout", () => {
    const props = {
      ...defaultProps,
      currentLayout: "List",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 14: Empty string layoutName
  it("should render with empty layoutName", () => {
    const props = {
      ...defaultProps,
      layoutName: "",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 15: Whitespace-only layoutName
  it("should render with whitespace layoutName", () => {
    const props = {
      ...defaultProps,
      layoutName: "   ",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 16: Multiple dashes in overridableId
  it("should render with multiple dashes in overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "custom---layout",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 17: UpdateQueryState function that throws (edge case testing)
  it("should handle updateQueryState that throws", () => {
    const props = {
      ...defaultProps,
      updateQueryState: () => {
        throw new Error("Test error");
      },
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 18: CurrentLayout with underscore
  it("should render with currentLayout = 'list_view'", () => {
    const props = {
      ...defaultProps,
      currentLayout: "list_view",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 19: Short layoutName
  it("should render with single character layoutName", () => {
    const props = {
      ...defaultProps,
      layoutName: "x",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 20: Unicode in layoutName
  it("should render with unicode characters in layoutName", () => {
    const props = {
      ...defaultProps,
      layoutName: "item-文档",
    };
    const wrapper = shallow(<LayoutSwitcher {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });
});
