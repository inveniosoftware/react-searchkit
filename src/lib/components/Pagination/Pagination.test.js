/*
 * SPDX-FileCopyrightText: 2026 CERN.
 * SPDX-License-Identifier: MIT
 */
import { mount } from "enzyme";
import React from "react";
import { AppContext } from "../ReactSearchKit/AppContext";
import Pagination from "./Pagination";

describe("test Pagination component", () => {
  const mountPagination = (mockUpdateQueryPage) =>
    mount(
      <AppContext.Provider value={{ buildUID: (id) => id }}>
        <Pagination
          currentPage={1}
          currentSize={10}
          loading={false}
          totalResults={50}
          updateQueryPage={mockUpdateQueryPage}
        />
      </AppContext.Provider>
    );

  const findPageItem = (wrapper, page) =>
    wrapper
      .find("a.item")
      .filterWhere(
        (node) => node.prop("value") === page && node.prop("type") === "pageItem"
      );

  it("should change page when 'Space' is pressed on a page item", () => {
    const mockUpdateQueryPage = jest.fn();
    const mockPreventDefault = jest.fn();
    const wrapper = mountPagination(mockUpdateQueryPage);

    findPageItem(wrapper, 2).simulate("keydown", {
      key: " ",
      preventDefault: mockPreventDefault,
    });

    expect(mockUpdateQueryPage).toHaveBeenCalledWith(2);
    // page scroll on "Space" should be prevented
    expect(mockPreventDefault).toHaveBeenCalled();
  });

  it("should still change page when 'Enter' is pressed on a page item", () => {
    const mockUpdateQueryPage = jest.fn();
    const wrapper = mountPagination(mockUpdateQueryPage);

    findPageItem(wrapper, 3).simulate("keydown", {
      key: "Enter",
      keyCode: 13,
      which: 13,
    });

    expect(mockUpdateQueryPage).toHaveBeenCalledWith(3);
  });

  it("should expose page items with a 'button' role", () => {
    const wrapper = mountPagination(jest.fn());

    expect(findPageItem(wrapper, 2).prop("role")).toEqual("button");
  });
});
