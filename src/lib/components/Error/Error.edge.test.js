/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import ErrorComponent from "./Error";
import { AppContext } from "../ReactSearchKit";

describe("Error - edge cases", () => {
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  // Test 1: Plain object with code and message properties
  // isEmpty returns false for objects with properties, so it should render
  it("should render with plain object - code property", () => {
    const error = { code: "500", message: "Internal Server Error" };
    const wrapper = mount(
      <AppContext.Provider value={{ buildUID }}>
        <ErrorComponent loading={false} error={error} overridableId="" />
      </AppContext.Provider>
    );
    // Component shows fixed message, not the actual error content
    expect(wrapper.text()).toBe("Oops! Something went wrong while fetching results.");
  });

  // Test 2: Plain object with just message property
  // isEmpty returns false for objects with properties, so it should render
  it("should render with plain object - message property", () => {
    const error = { message: "Something went wrong" };
    const wrapper = mount(
      <AppContext.Provider value={{ buildUID }}>
        <ErrorComponent loading={false} error={error} overridableId="" />
      </AppContext.Provider>
    );
    // Component shows fixed message, not the actual error content
    expect(wrapper.text()).toBe("Oops! Something went wrong while fetching results.");
  });

  // Test 3: Array as error
  // isEmpty returns false for non-empty arrays, so it should render
  it("should render with array as error", () => {
    const error = ["Error 1", "Error 2"];
    const wrapper = mount(
      <AppContext.Provider value={{ buildUID }}>
        <ErrorComponent loading={false} error={error} overridableId="" />
      </AppContext.Provider>
    );
    expect(wrapper.text()).toBe("Oops! Something went wrong while fetching results.");
  });

  // Test 4: Error object with message
  // isEmpty returns true for Error objects (no enumerable properties), so should NOT render
  it("should not render with Error object with message", () => {
    const error = new global.Error("Network request failed");
    const wrapper = mount(
      <AppContext.Provider value={{ buildUID }}>
        <ErrorComponent loading={false} error={error} overridableId="" />
      </AppContext.Provider>
    );
    // Error objects have no enumerable properties, so isEmpty returns true
    expect(wrapper.text()).toBe("");
  });

  // Test 5: Empty object
  // isEmpty returns true for empty objects, so should NOT render
  it("should not render with empty object", () => {
    const error = {};
    const wrapper = mount(
      <AppContext.Provider value={{ buildUID }}>
        <ErrorComponent loading={false} error={error} overridableId="" />
      </AppContext.Provider>
    );
    expect(wrapper.text()).toBe("");
  });

  // Test 6: Error object without message
  // isEmpty returns true for Error objects (no enumerable properties), so should NOT render
  it("should not render with Error object without message", () => {
    const error = new global.Error();
    const wrapper = mount(
      <AppContext.Provider value={{ buildUID }}>
        <ErrorComponent loading={false} error={error} overridableId="" />
      </AppContext.Provider>
    );
    // Error objects have no enumerable properties, so isEmpty returns true
    expect(wrapper.text()).toBe("");
  });
});
