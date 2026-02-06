/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is免费软件; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow } from "enzyme";
import ResultsLoader from "./ResultsLoader";

describe("ResultsLoader - edge cases", () => {
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  it("should render with loading = true", () => {
    const wrapper = shallow(
      <ResultsLoader loading overridableId="" buildUID={buildUID} />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with loading = false", () => {
    const wrapper = shallow(
      <ResultsLoader loading={false} overridableId="" buildUID={buildUID} />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with overridableId", () => {
    const wrapper = shallow(
      <ResultsLoader loading overridableId="custom" buildUID={buildUID} />
    );
    expect(wrapper.exists()).toBe(true);
  });
});
