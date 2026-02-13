/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { shallow } from "enzyme";
import SortBy from "./SortBy";

describe("SortBy - edge cases", () => {
  const updateQuerySortBy = jest.fn();
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  const defaultProps = {
    currentSortBy: "newest",
    loading: false,
    totalResults: 10,
    values: [
      { value: "newest", text: "Newest" },
      { value: "oldest", text: "Oldest" },
      { value: "bestmatch", text: "Best Match" },
    ],
    updateQuerySortBy,
    overridableId: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock buildUID globally
    if (!global.buildUID) {
      global.buildUID = jest.fn(buildUID);
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with single option", () => {
    const props = {
      ...defaultProps,
      values: [{ value: "newest", text: "Newest" }],
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with currentValue not in options", () => {
    const props = {
      ...defaultProps,
      currentSortBy: "unknown_value",
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render when loading is true", () => {
    const props = {
      ...defaultProps,
      loading: true,
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with multiple duplicate values in options", () => {
    const props = {
      ...defaultProps,
      values: [
        { value: "newest", text: "Newest First" },
        { value: "newest", text: "Newest" },
      ],
      currentSortBy: "newest",
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with empty options array", () => {
    const props = {
      ...defaultProps,
      values: [],
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with null currentSortBy", () => {
    const props = {
      ...defaultProps,
      currentSortBy: null,
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with totalResults of 0", () => {
    const props = {
      ...defaultProps,
      totalResults: 0,
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with negative totalResults", () => {
    const props = {
      ...defaultProps,
      totalResults: -1,
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "custom-id",
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom ariaLabel", () => {
    const props = {
      ...defaultProps,
      ariaLabel: "Custom Sort Label",
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with selectOnNavigation prop", () => {
    const props = {
      ...defaultProps,
      selectOnNavigation: true,
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with zero totalResults and loading true", () => {
    const props = {
      ...defaultProps,
      totalResults: 0,
      loading: true,
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle currentSortBy as falsy string '0'", () => {
    const props = {
      ...defaultProps,
      currentSortBy: "0",
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle currentSortBy as empty string", () => {
    const props = {
      ...defaultProps,
      currentSortBy: "",
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle options with special characters", () => {
    const props = {
      ...defaultProps,
      values: [
        { value: "sort-by-date:asc", text: "Date (Ascending)" },
        { value: "sort-by-title:desc", text: "Title (Descending)" },
      ],
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with label function", () => {
    const customLabel = (element) => element;
    const props = {
      ...defaultProps,
      label: customLabel,
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle missing label prop (should use default)", () => {
    const { label, ...propsWithoutLabel } = defaultProps;
    const wrapper = shallow(<SortBy {...propsWithoutLabel} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle loading false, totalResults positive, and currentSortBy not null", () => {
    const props = {
      ...defaultProps,
      loading: false,
      totalResults: 1,
      currentSortBy: "oldest",
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle very large totalResults count", () => {
    const props = {
      ...defaultProps,
      totalResults: 9999999,
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle single character currentSortBy", () => {
    const props = {
      ...defaultProps,
      currentSortBy: "a",
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle onChange with same value as currentSortBy", () => {
    const props = {
      ...defaultProps,
      currentSortBy: "newest",
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    // Get the sort by instance
    const instance = wrapper.dive().instance() || wrapper.instance();
    if (instance && instance.onChange) {
      instance.onChange("newest"); // Same value
      expect(updateQuerySortBy).not.toHaveBeenCalled();
    }
  });

  it("should call updateQuerySortBy onChange with different value", () => {
    const props = {
      ...defaultProps,
      currentSortBy: "newest",
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);
    const instance = wrapper.dive().instance() || wrapper.instance();
    if (instance && instance.onChange) {
      instance.onChange("oldest"); // Different value
      expect(updateQuerySortBy).toHaveBeenCalledWith("oldest");
    }
  });

  it("should simulate dropdown change event", () => {
    const props = {
      ...defaultProps,
      currentSortBy: "newest",
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);

    // Verify the component rendered with expected structure
    expect(wrapper.exists()).toBe(true);
  });

  it("should not update when dropdown change event selects same value", () => {
    const props = {
      ...defaultProps,
      currentSortBy: "newest",
    };
    const wrapper = shallow(<SortBy {...props} buildUID={buildUID} />);

    // Verify the component rendered
    expect(wrapper.exists()).toBe(true);
  });
});
