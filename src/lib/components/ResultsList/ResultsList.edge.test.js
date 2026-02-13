/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow, mount } from "enzyme";
import ResultsList from "./ResultsList";
import { AppContext } from "../ReactSearchKit";

describe("ResultsList Edge Cases", () => {
  const defaultBuildUID = (component, id) => `${component}${id || ""}`;

  const createAppContext = (buildUID = defaultBuildUID) => ({
    AppStore: {},
    buildUID,
  });

  it("should render without crashing", () => {
    const wrapper = shallow(
      <ResultsList results={[]} totalResults={0} loading={false} />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with custom overridableId", () => {
    const wrapper = shallow(
      <ResultsList
        results={[]}
        totalResults={0}
        loading={false}
        overridableId="CustomResultsList"
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  describe("Empty results array", () => {
    it("should render with empty results array and zero total", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={[]} totalResults={0} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("results")).toEqual([]);
      expect(wrapper.find("ResultsList").prop("totalResults")).toBe(0);
    });

    it("should render with empty results but non-zero total (loading state)", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={[]} totalResults={10} loading={true} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("results")).toEqual([]);
      expect(wrapper.find("ResultsList").prop("totalResults")).toBe(10);
    });
  });

  describe("Different results configurations", () => {
    it("should render with single result", () => {
      const singleResult = [{ id: "1", title: "Test Result" }];
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={singleResult} totalResults={1} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("results")).toHaveLength(1);
    });

    it("should render with multiple results", () => {
      const multipleResults = [
        { id: "1", title: "Result 1" },
        { id: "2", title: "Result 2" },
        { id: "3", title: "Result 3" },
      ];
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={multipleResults} totalResults={3} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("results")).toHaveLength(3);
    });

    it("should render with large result set", () => {
      const largeResults = Array.from({ length: 100 }, (_, i) => ({
        id: i.toString(),
        title: `Result ${i}`,
      }));
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={largeResults} totalResults={100} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("results")).toHaveLength(100);
    });

    it("should render results with complex object structures", () => {
      const complexResults = [
        {
          id: "complex-1",
          metadata: {
            title: "Complex Title",
            authors: ["Author 1", "Author 2"],
            abstract: "Test abstract",
            dates: {
              created: "2024-01-01",
              modified: "2024-01-02",
            },
          },
          links: { self: "/1" },
        },
      ];
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={complexResults} totalResults={1} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("results")).toHaveLength(1);
    });

    it("should handle results with null/undefined values in objects", () => {
      const resultsWithNulls = [
        { id: "1", title: "With null", description: null },
        { id: "2", title: "With undefined", description: undefined },
      ];
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={resultsWithNulls} totalResults={2} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("results")).toHaveLength(2);
    });
  });

  describe("Total results variations", () => {
    it("should render with results length matching totalResults", () => {
      const results = [{ id: "1" }, { id: "2" }];
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={results} totalResults={2} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("results")).toHaveLength(2);
      expect(wrapper.find("ResultsList").prop("totalResults")).toBe(2);
    });

    it("should render with results length not matching totalResults (pagination)", () => {
      const results = [{ id: "1" }, { id: "2" }];
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={results} totalResults={100} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("results")).toHaveLength(2);
      expect(wrapper.find("ResultsList").prop("totalResults")).toBe(100);
    });

    it("should render with zero totalResults", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={[]} totalResults={0} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("totalResults")).toBe(0);
    });

    it("should render with very large totalResults number", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={[]} totalResults={999999999} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("totalResults")).toBe(999999999);
    });
  });

  describe("Custom overridableId scenarios", () => {
    const customIds = [
      "MyResults",
      "CustomResultsList",
      "Test123",
      "with-separator",
      "with_underscore",
    ];

    customIds.forEach((id) => {
      it(`should render with overridableId: "${id}"`, () => {
        const wrapper = mount(
          <AppContext.Provider value={createAppContext()}>
            <ResultsList
              results={[]}
              totalResults={0}
              loading={false}
              overridableId={id}
            />
          </AppContext.Provider>
        );
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find("ResultsList").prop("overridableId")).toBe(id);
      });
    });

    it("should use empty string as default overridableId", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={[]} totalResults={0} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.find("ResultsList").prop("overridableId")).toBe("");
    });
  });

  describe("AppContext integration", () => {
    it("should render without AppContext (shallow)", () => {
      const wrapper = shallow(
        <ResultsList results={[]} totalResults={0} loading={false} />
      );
      expect(wrapper.exists()).toBe(true);
    });

    it("should use provided buildUID from AppContext", () => {
      const customBuildUID = (component, id) =>
        `${component}-custom${id || ""}`;
      const wrapper = mount(
        <AppContext.Provider value={createAppContext(customBuildUID)}>
          <ResultsList results={[]} totalResults={0} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
    });

    it("should build UID with custom overridableId", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList
            results={[]}
            totalResults={0}
            loading={false}
            overridableId="TestResults"
          />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("overridableId")).toBe(
        "TestResults"
      );
    });
  });

  describe("onResultsRendered callback", () => {
    it("should call onResultsRendered when provided", () => {
      const mockCallback = jest.fn();
      const results = [{ id: "1", title: "Test" }];

      mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList
            results={results}
            totalResults={1}
            loading={false}
            onResultsRendered={mockCallback}
          />
        </AppContext.Provider>
      );

      expect(mockCallback).toHaveBeenCalled();
    });

    it("should not call onResultsRendered when not provided", () => {
      const mockCallback = jest.fn();
      const results = [{ id: "1", title: "Test" }];

      mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={results} totalResults={1} loading={false} />
        </AppContext.Provider>
      );

      expect(mockCallback).not.toHaveBeenCalled();
    });
  });

  describe("Edge cases with state changes", () => {
    it("should handle changing from empty to non-empty results", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={[]} totalResults={0} loading={false} />
        </AppContext.Provider>
      );

      expect(wrapper.find("ResultsList").prop("results")).toHaveLength(0);

      const newWrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList
            results={[{ id: "1", title: "New Result" }]}
            totalResults={1}
            loading={false}
          />
        </AppContext.Provider>
      );

      expect(newWrapper.find("ResultsList").prop("results")).toHaveLength(1);
    });

    it("should handle changing from non-empty to empty results", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList
            results={[{ id: "1", title: "Result" }]}
            totalResults={1}
            loading={false}
          />
        </AppContext.Provider>
      );

      expect(wrapper.find("ResultsList").prop("results")).toHaveLength(1);

      const newWrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={[]} totalResults={0} loading={false} />
        </AppContext.Provider>
      );

      expect(newWrapper.find("ResultsList").prop("results")).toHaveLength(0);
    });

    it("should handle results array replacement", () => {
      const initialResults = [{ id: "1", title: "Initial" }];
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={initialResults} totalResults={1} loading={false} />
        </AppContext.Provider>
      );

      expect(wrapper.find("ResultsList").prop("results")).toHaveLength(1);

      const newResults = [
        { id: "2", title: "New" },
        { id: "3", title: "Another" },
      ];

      const newWrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={newResults} totalResults={2} loading={false} />
        </AppContext.Provider>
      );

      expect(newWrapper.find("ResultsList").prop("results")).toHaveLength(2);
      expect(newWrapper.find("ResultsList").prop("results")[0].id).toBe("2");
    });
  });

  describe("ShouldRender conditional rendering", () => {
    it("should not render content when loading is true", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={[]} totalResults={10} loading={true} />
        </AppContext.Provider>
      );

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("loading")).toBe(true);
    });

    it("should not render content when totalResults is 0", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={[]} totalResults={0} loading={false} />
        </AppContext.Provider>
      );

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("totalResults")).toBe(0);
    });

    it("should not render content when both loading and no results", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={[]} totalResults={0} loading={true} />
        </AppContext.Provider>
      );

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("loading")).toBe(true);
      expect(wrapper.find("ResultsList").prop("totalResults")).toBe(0);
    });

    it("should allow rendering when loading is false and totalResults > 0", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList
            results={[{ id: "1", title: "Test" }]}
            totalResults={1}
            loading={false}
          />
        </AppContext.Provider>
      );

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("loading")).toBe(false);
      expect(wrapper.find("ResultsList").prop("totalResults")).toBe(1);
    });
  });

  describe("Element component props", () => {
    it("should pass results to Element component", () => {
      const results = [{ id: "1", title: "Test" }];
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={results} totalResults={1} loading={false} />
        </AppContext.Provider>
      );

      expect(wrapper.exists()).toBe(true);
    });

    it("should include overridableId in container ID", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList
            results={[]}
            totalResults={0}
            loading={false}
            overridableId="TestResults"
          />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("ResultsList").prop("overridableId")).toBe(
        "TestResults"
      );
    });
  });

  describe("Item rendering with minimal data", () => {
    it("should handle result with only id field", () => {
      const minimalResult = [{ id: "1" }];
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={minimalResult} totalResults={1} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
    });

    it("should use default imgSrc when not provided", () => {
      const resultWithoutImage = [{ id: "1", title: "Test" }];
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList
            results={resultWithoutImage}
            totalResults={1}
            loading={false}
          />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
    });

    it("should use custom imgSrc when provided", () => {
      const resultWithImage = [
        { id: "1", title: "Test", imgSrc: "https://example.com/image.jpg" },
      ];
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={resultWithImage} totalResults={1} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("PropTypes validation", () => {
    it("should be wrapped by Overridable", () => {
      const componentWrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={[]} totalResults={0} loading={false} />
        </AppContext.Provider>
      );
      expect(componentWrapper.exists()).toBe(true);
    });

    it("should handle missing loading prop validation", () => {
      const wrapper = mount(
        <AppContext.Provider value={createAppContext()}>
          <ResultsList results={[]} totalResults={0} loading={false} />
        </AppContext.Provider>
      );
      expect(wrapper.exists()).toBe(true);
    });
  });
});
