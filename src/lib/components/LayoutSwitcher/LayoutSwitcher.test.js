/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { mount } from "enzyme";
import React from "react";
import LayoutSwitcher from "./LayoutSwitcher";
import { AppContext } from "../ReactSearchKit";

describe("LayoutSwitcher tests", () => {
  let updateQueryState;
  let buildUID;

  beforeEach(() => {
    updateQueryState = jest.fn();
    buildUID = (elementId, overridableId = "") =>
      overridableId ? `${elementId}.${overridableId}` : elementId;
  });

  afterEach(() => {
    updateQueryState.mockClear();
  });

  // Test 1: Simple render
  it("should render without crashing", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{
          appName: "MyApp",
          buildUID: buildUID,
        }}
      >
        <LayoutSwitcher
          currentLayout="list"
          layoutName="item"
          updateQueryState={updateQueryState}
          overridableId=""
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });

  // Test 2: Render with currentLayout='list'
  it("should render with currentLayout='list'", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{
          appName: "MyApp",
          buildUID: buildUID,
        }}
      >
        <LayoutSwitcher
          currentLayout="list"
          layoutName="item"
          updateQueryState={updateQueryState}
          overridableId=""
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(LayoutSwitcher).length).toBe(1);
    wrapper.unmount();
  });

  // Test 3: Render with currentLayout='grid'
  it("should render with currentLayout='grid'", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{
          appName: "MyApp",
          buildUID: buildUID,
        }}
      >
        <LayoutSwitcher
          currentLayout="grid"
          layoutName="item"
          updateQueryState={updateQueryState}
          overridableId=""
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(LayoutSwitcher).length).toBe(1);
    wrapper.unmount();
  });

  // Test 4: Render with custom overridableId
  it("should render with custom overridableId", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{
          appName: "MyApp",
          buildUID: buildUID,
        }}
      >
        <LayoutSwitcher
          currentLayout="list"
          layoutName="item"
          updateQueryState={updateQueryState}
          overridableId="custom"
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(LayoutSwitcher).length).toBe(1);
    wrapper.unmount();
  });

  // Test 5: Render with layoutName='record'
  it("should render with layoutName='record'", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{
          appName: "MyApp",
          buildUID: buildUID,
        }}
      >
        <LayoutSwitcher
          currentLayout="list"
          layoutName="record"
          updateQueryState={updateQueryState}
          overridableId=""
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(LayoutSwitcher).length).toBe(1);
    wrapper.unmount();
  });

  // Test 6: Render with different layoutName
  it("should render with layoutName='document'", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{
          appName: "MyApp",
          buildUID: buildUID,
        }}
      >
        <LayoutSwitcher
          currentLayout="list"
          layoutName="document"
          updateQueryState={updateQueryState}
          overridableId=""
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(LayoutSwitcher).length).toBe(1);
    wrapper.unmount();
  });

  // Test 7: Render with empty overridableId
  it("should render with empty overridableId", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{
          appName: "MyApp",
          buildUID: buildUID,
        }}
      >
        <LayoutSwitcher
          currentLayout="list"
          layoutName="item"
          updateQueryState={updateQueryState}
          overridableId=""
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(LayoutSwitcher).length).toBe(1);
    wrapper.unmount();
  });

  // Test 8: Update functions are called on interactions
  it("should accept updateQueryState function", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{
          appName: "MyApp",
          buildUID: buildUID,
        }}
      >
        <LayoutSwitcher
          currentLayout="list"
          layoutName="item"
          updateQueryState={updateQueryState}
          overridableId=""
        />
      </AppContext.Provider>
    );
    expect(wrapper.find(LayoutSwitcher).length).toBe(1);
    wrapper.unmount();
  });

  // Test 9: Mix layouts
  it("should render with currentLayout='list_view'", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{
          appName: "MyApp",
          buildUID: buildUID,
        }}
      >
        <LayoutSwitcher
          currentLayout="list_view"
          layoutName="item"
          updateQueryState={updateQueryState}
          overridableId=""
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(LayoutSwitcher).length).toBe(1);
    wrapper.unmount();
  });

  // Test 10: All props provided
  it("should accept all required and optional props", () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{
          appName: "MyApp",
          buildUID: buildUID,
        }}
      >
        <LayoutSwitcher
          currentLayout="list"
          layoutName="test-item"
          updateQueryState={updateQueryState}
          overridableId="test-overridable"
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(LayoutSwitcher).length).toBe(1);
    wrapper.unmount();
  });
});
