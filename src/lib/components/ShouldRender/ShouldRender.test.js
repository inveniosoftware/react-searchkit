/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import ShouldRender from "./ShouldRender";

describe("ShouldRender", () => {
  it("should render children when condition is true", () => {
    const wrapper = mount(
      <ShouldRender condition>
        <div className="test-content">Content</div>
      </ShouldRender>
    );
    expect(wrapper.text()).toContain("Content");
    wrapper.unmount();
  });

  it("should render children when condition is not provided (default true)", () => {
    const wrapper = mount(
      <ShouldRender>
        <div className="default-content">Default Content</div>
      </ShouldRender>
    );
    expect(wrapper.find(".default-content")).toHaveLength(1);
    wrapper.unmount();
  });

  it("should not render children when condition is false", () => {
    const wrapper = mount(
      <ShouldRender condition={false}>
        <div className="test-content">Content</div>
      </ShouldRender>
    );
    // When component returns null, enzyme's mount still creates a wrapper
    // The actual content is not rendered, so wrapper.find returns empty
    expect(wrapper.find(".test-content")).toHaveLength(0);
    wrapper.unmount();
  });

  it("should render multiple children when condition is true", () => {
    const wrapper = mount(
      <ShouldRender condition>
        <span>First</span>
        <span>Second</span>
      </ShouldRender>
    );
    expect(wrapper.find("span")).toHaveLength(2);
    wrapper.unmount();
  });
});
