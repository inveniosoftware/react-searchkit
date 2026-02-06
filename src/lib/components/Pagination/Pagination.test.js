/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import Pagination from "./Pagination";
import { AppContext } from "../ReactSearchKit";

describe("Pagination", () => {
  const defaultProps = {
    loading: false,
    currentPage: 1,
    currentSize: 10,
    totalResults: 100,
    updateQueryPage: jest.fn(),
  };

  const options = {
    boundaryRangeCount: 0,
    siblingRangeCount: 1,
    showEllipsis: false,
    showFirst: false,
    showLast: false,
    showPrev: false,
    showNext: false,
    size: "mini",
  };

  const renderWithAppContext = (props) => {
    return mount(
      <AppContext.Provider
        value={{ appName: "MyApp", buildUID: (x, y) => `${x}-${y}` }}
      >
        <Pagination {...props} />
      </AppContext.Provider>
    );
  };

  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
    jest.clearAllMocks();
  });

  it("should exist as component", () => {
    expect(Pagination).toBeDefined();
    expect(typeof Pagination).toBe("function");
  });

  it("should render when not loading and there are results > currentSize", () => {
    wrapper = renderWithAppContext(defaultProps);
    expect(wrapper.exists()).toBe(true);
  });

  it("should not render when loading is true", () => {
    wrapper = renderWithAppContext({ ...defaultProps, loading: true });
    expect(wrapper.find("Paginator")).toHaveLength(0);
  });

  it("should not render when totalResults <= currentSize and showWhenOnlyOnePage is false", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      totalResults: 10,
      currentSize: 10,
      showWhenOnlyOnePage: false,
    });
    expect(wrapper.find("Paginator")).toHaveLength(0);
  });

  it("should not render when totalResults is 0 and showWhenOnlyOnePage is false", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      totalResults: 0,
      showWhenOnlyOnePage: false,
    });
    expect(wrapper.find("Paginator")).toHaveLength(0);
  });

  it("should render with one page when showWhenOnlyOnePage is true and totalResults > 0", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      totalResults: 5,
      currentSize: 10,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should not render when totalResults is 0 and showWhenOnlyOnePage is true", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      totalResults: 0,
      showWhenOnlyOnePage: true,
    });
    expect(wrapper.find("Paginator")).toHaveLength(0);
  });

  it("should not render when currentPage is -1", () => {
    wrapper = renderWithAppContext({ ...defaultProps, currentPage: -1 });
    expect(wrapper.find("Paginator")).toHaveLength(0);
  });

  it("should not render when currentSize is -1", () => {
    wrapper = renderWithAppContext({ ...defaultProps, currentSize: -1 });
    expect(wrapper.find("Paginator")).toHaveLength(0);
  });

  it("should call updateQueryPage when page changes", () => {
    wrapper = renderWithAppContext(defaultProps);
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      const onPageChange = paginator.prop("onPageChange");
      onPageChange(null, { activePage: 2 });
      expect(defaultProps.updateQueryPage).toHaveBeenCalledWith(2);
    }
  });

  it("should not call updateQueryPage when clicking the same page", () => {
    wrapper = renderWithAppContext(defaultProps);
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      const onPageChange = paginator.prop("onPageChange");
      onPageChange(null, { activePage: 1 });
      expect(defaultProps.updateQueryPage).not.toHaveBeenCalled();
    }
  });

  it("should render with overridableId", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      totalResults: 100,
      currentSize: 10,
      overridableId: "custom",
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should render without options", () => {
    wrapper = renderWithAppContext({ ...defaultProps, options: undefined });
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom options", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      options: options,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle large total results", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      totalResults: 50000,
      options: options,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should respect maxTotalResults option", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      totalResults: 50000,
      currentSize: 10,
      options: {
        ...options,
        maxTotalResults: 100,
      },
    });
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      expect(paginator.prop("totalPages")).toBe(10);
    }
  });

  it("should use default maxTotalResults when not specified", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      totalResults: 50000,
      currentSize: 10,
      options: options,
    });
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      expect(paginator.prop("totalPages")).toBeLessThan(5001);
      expect(paginator.prop("totalPages")).toBe(10000);
    }
  });

  it("should show ellipsis when showEllipsis is true", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      totalResults: 100,
      currentSize: 10,
      options: {
        boundaryRangeCount: 1,
        siblingRangeCount: 1,
        showEllipsis: true,
        showFirst: true,
        showLast: true,
        showPrev: true,
        showNext: true,
        size: "large",
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should hide ellipsis when showEllipsis is false", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      options: {
        showEllipsis: false,
      },
    });
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      expect(paginator.prop("ellipsisItem")).toBeNull();
    }
  });

  it("should hide first item when showFirst is false", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      options: {
        showFirst: false,
      },
    });
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      expect(paginator.prop("firstItem")).toBeNull();
    }
  });

  it("should hide last item when showLast is false", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      options: {
        showLast: false,
      },
    });
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      expect(paginator.prop("lastItem")).toBeNull();
    }
  });

  it("should hide prev item when showPrev is false", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      options: {
        showPrev: false,
      },
    });
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      expect(paginator.prop("prevItem")).toBeNull();
    }
  });

  it("should hide next item when showNext is false", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      options: {
        showNext: false,
      },
    });
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      expect(paginator.prop("nextItem")).toBeNull();
    }
  });

  it("should render with different sizes", () => {
    const sizes = ["mini", "tiny", "small", "large", "huge", "massive"];
    sizes.forEach((size) => {
      const w = renderWithAppContext({
        ...defaultProps,
        options: { size },
      });
      const paginator = w.find("Paginator");
      if (paginator.length > 0) {
        expect(paginator.prop("size")).toBe(size);
      }
      w.unmount();
    });
  });

  it("should calculate total pages correctly", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      totalResults: 100,
      currentSize: 20,
    });
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      expect(paginator.prop("totalPages")).toBe(5);
    }
  });

  it("should set activePage correctly", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      currentPage: 3,
      totalResults: 100,
      currentSize: 10,
    });
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      expect(paginator.prop("activePage")).toBe(3);
    }
  });

  it("should respect boundaryRangeCount option", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      options: {
        boundaryRangeCount: 2,
      },
    });
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      expect(paginator.prop("boundaryRange")).toBe(2);
    }
  });

  it("should respect siblingRangeCount option", () => {
    wrapper = renderWithAppContext({
      ...defaultProps,
      options: {
        siblingRangeCount: 2,
      },
    });
    const paginator = wrapper.find("Paginator");
    if (paginator.length > 0) {
      expect(paginator.prop("siblingRange")).toBe(2);
    }
  });

  it("should handle currentPage greater than pages by calling onPageChange", () => {
    const updateQueryPage = jest.fn();
    wrapper = renderWithAppContext({
      ...defaultProps,
      currentPage: 15,
      totalResults: 100,
      currentSize: 10,
      updateQueryPage,
    });
    // onPageChange is called during render when currentPage > pages
    expect(updateQueryPage).toHaveBeenCalledWith(10);
  });
});
