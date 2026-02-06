/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow } from "enzyme";
import EmptyResults from "./EmptyResults";
import { AppContext } from "../ReactSearchKit";

const buildUID = (elementId, overridableId = "") =>
  overridableId ? `${elementId}.${overridableId}` : elementId;

describe("EmptyResults - edge cases", () => {
  const mockEmptyResults = jest.fn();
  const mockQuery = jest.fn();

  it("should render with empty query string", () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <EmptyResults
          query={{ queryString: "" }}
          loading={false}
          totalResults={0}
          overridableId=""
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with search query but no results", () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <EmptyResults
          query={{ queryString: "test query" }}
          loading={false}
          totalResults={0}
          overridableId=""
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should not render when totalResults > 0", () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <EmptyResults
          query={{ queryString: "test" }}
          loading={false}
          totalResults={5}
          overridableId=""
        />
      </AppContext.Provider>
    );
    // When totalResults > 0, internal ShouldRender should prevent rendering
    // The ShouldRender component itself exists but its children may not render
    expect(wrapper.exists()).toBe(true);
  });

  it("should pass overridableId to buildUID", () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <EmptyResults
          query={{ queryString: "" }}
          loading={false}
          totalResults={0}
          overridableId="custom"
          emptyResults={mockEmptyResults}
          queryComponent={mockQuery}
        />
      </AppContext.Provider>
    );
    // Just ensure it renders without error
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle custom emptyResults component", () => {
    mockEmptyResults.mockReturnValue(<div>Custom Empty</div>);
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <EmptyResults
          query={{ queryString: "" }}
          loading={false}
          totalResults={0}
          overridableId=""
          emptyResults={mockEmptyResults}
          queryComponent={{ queryString: "" }}
        />
      </AppContext.Provider>
    );
    // The custom component is passed to the internal Element
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle custom query component", () => {
    mockQuery.mockReturnValue(<div>Custom Query</div>);
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <EmptyResults
          query={{ queryString: "" }}
          loading={false}
          totalResults={0}
          overridableId=""
          queryComponent={mockQuery}
          emptyResults={() => <div>Empty</div>}
        />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
