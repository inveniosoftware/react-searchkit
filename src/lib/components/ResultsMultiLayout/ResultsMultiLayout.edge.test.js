/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow } from "enzyme";
import ResultsMultiLayout from "./ResultsMultiLayout";

describe("ResultsMultiLayout - edge cases", () => {
  const onResultsRendered = jest.fn();
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  it("should render with empty results", () => {
    const wrapper = shallow(
      <ResultsMultiLayout
        results={[]}
        layout="list"
        totalResults={0}
        onResultsRendered={onResultsRendered}
        overridableId=""
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with single result", () => {
    const wrapper = shallow(
      <ResultsMultiLayout
        results={[{ id: 1, title: "Test" }]}
        layout="list"
        totalResults={1}
        onResultsRendered={onResultsRendered}
        overridableId=""
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with grid layout", () => {
    const wrapper = shallow(
      <ResultsMultiLayout
        results={[{ id: 1, title: "Test" }]}
        layout="grid"
        totalResults={1}
        onResultsRendered={onResultsRendered}
        overridableId=""
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with overridableId", () => {
    const wrapper = shallow(
      <ResultsMultiLayout
        results={[{ id: 1, title: "Test" }]}
        layout="list"
        totalResults={1}
        onResultsRendered={onResultsRendered}
        overridableId="custom"
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });
});
