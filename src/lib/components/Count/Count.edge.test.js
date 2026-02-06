/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow } from "enzyme";
import Count from "./Count";

describe("Count - edge cases", () => {
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  it("should render with totalResults = 0", () => {
    const wrapper = shallow(
      <Count totalResults={0} loading={false} overridableId="" buildUID={buildUID} />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with totalResults = 1", () => {
    const wrapper = shallow(
      <Count totalResults={1} loading={false} overridableId="" buildUID={buildUID} />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with large totalResults", () => {
    const wrapper = shallow(
      <Count
        totalResults={9999999}
        loading={false}
        overridableId=""
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with loading = true", () => {
    const wrapper = shallow(
      <Count totalResults={100} loading overridableId="" buildUID={buildUID} />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with overridableId", () => {
    const wrapper = shallow(
      <Count
        totalResults={100}
        loading={false}
        overridableId="custom"
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });
});
