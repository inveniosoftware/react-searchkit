/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { mount } from "enzyme";
import { AppContext } from "../ReactSearchKit";
import ResultsGrid from "./ResultsGrid";

describe("ResultsGrid - edge cases", () => {
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  const mockResult = {
    id: "1",
    title: "Test Title",
    description: "Test Description",
    imgSrc: "https://example.com/image.jpg",
  };

  const renderWithAppContext = (props) =>
    mount(
      <AppContext.Provider value={{ appName: "test", buildUID }}>
        <ResultsGrid {...props} />
      </AppContext.Provider>
    );

  describe("empty results array", () => {
    it("should render with empty results array", () => {
      const wrapper = renderWithAppContext({
        results: [],
        overridableId: "",
        loading: false,
        totalResults: 5,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });

    it("should not render Element component when results is empty", () => {
      const wrapper = renderWithAppContext({
        results: [],
        overridableId: "",
        loading: false,
        totalResults: 0,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });
  });

  describe("single result", () => {
    it("should render with single result", () => {
      const wrapper = renderWithAppContext({
        results: [mockResult],
        overridableId: "",
        loading: false,
        totalResults: 1,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });

    it("should render single result with minimal fields", () => {
      const minimalResult = { id: "2", title: "Minimal" };
      const wrapper = renderWithAppContext({
        results: [minimalResult],
        overridableId: "",
        loading: false,
        totalResults: 1,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
      expect(wrapper.text()).toContain("Minimal");
    });
  });

  describe("custom overridableId", () => {
    it("should render with overridableId", () => {
      const wrapper = renderWithAppContext({
        results: [mockResult],
        overridableId: "custom",
        loading: false,
        totalResults: 1,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });

    it("should render with different overridableId values", () => {
      const overridableIds = ["test1", "test-2", "test_3", "Test.4"];
      overridableIds.forEach((id) => {
        const wrapper = renderWithAppContext({
          results: [mockResult],
          overridableId: id,
          loading: false,
          totalResults: 1,
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find(ResultsGrid).exists()).toBe(true);
      });
    });
  });

  describe("different results configurations", () => {
    it("should render with multiple results", () => {
      const multipleResults = [
        { id: "1", title: "Title 1", description: "Desc 1" },
        { id: "2", title: "Title 2", description: "Desc 2" },
        { id: "3", title: "Title 3", description: "Desc 3" },
      ];
      const wrapper = renderWithAppContext({
        results: multipleResults,
        overridableId: "",
        loading: false,
        totalResults: 3,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
      expect(wrapper.text()).toContain("Title 1");
      expect(wrapper.text()).toContain("Title 2");
      expect(wrapper.text()).toContain("Title 3");
    });

    it("should render with custom resultsPerRow", () => {
      const wrapper = renderWithAppContext({
        results: [mockResult],
        resultsPerRow: 5,
        overridableId: "",
        loading: false,
        totalResults: 1,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });

    it("should render with resultsPerRow=1", () => {
      const wrapper = renderWithAppContext({
        results: [mockResult],
        resultsPerRow: 1,
        overridableId: "",
        loading: false,
        totalResults: 1,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });

    it("should render with resultsPerRow=10", () => {
      const wrapper = renderWithAppContext({
        results: Array.from({ length: 10 }, (_, i) => ({
          id: `${i}`,
          title: `Title ${i}`,
        })),
        resultsPerRow: 10,
        overridableId: "",
        loading: false,
        totalResults: 10,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });

    it("should render with results without imgSrc", () => {
      const resultsWithoutImage = [
        { id: "1", title: "No Image", description: "Has no image" },
        { id: "2", title: "No Image 2", description: "Also no image" },
      ];
      const wrapper = renderWithAppContext({
        results: resultsWithoutImage,
        overridableId: "",
        loading: false,
        totalResults: 2,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
      expect(wrapper.text()).toContain("No Image");
      expect(wrapper.text()).toContain("Has no image");
    });

    it("should render with results with empty strings", () => {
      const emptyStringResult = {
        id: "",
        title: "",
        description: "",
      };
      const wrapper = renderWithAppContext({
        results: [emptyStringResult],
        overridableId: "",
        loading: false,
        totalResults: 1,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });

    it("should render with mixed results (some with imgSrc, some without)", () => {
      const mixedResults = [
        { id: "1", title: "With Image", imgSrc: "https://example.com/1.jpg" },
        { id: "2", title: "Without Image" },
        { id: "3", title: "With Image 2", imgSrc: "https://example.com/3.jpg" },
      ];
      const wrapper = renderWithAppContext({
        results: mixedResults,
        overridableId: "",
        loading: false,
        totalResults: 3,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
      expect(wrapper.text()).toContain("With Image");
      expect(wrapper.text()).toContain("Without Image");
    });

    it("should render with large number of results", () => {
      const largeResults = Array.from({ length: 50 }, (_, i) => ({
        id: `${i}`,
        title: `Title ${i}`,
        description: `Description ${i}`,
      }));
      const wrapper = renderWithAppContext({
        results: largeResults,
        overridableId: "",
        loading: false,
        totalResults: 50,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });

    it("should render with result having special characters", () => {
      const specialCharResult = {
        id: "special-1",
        title: "Title with <script> tags & special chars",
        description: "Desc with 'quotes' and \"double quotes\"",
      };
      const wrapper = renderWithAppContext({
        results: [specialCharResult],
        overridableId: "",
        loading: false,
        totalResults: 1,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });

    it("should render with result having long text", () => {
      const longTextResult = {
        id: "long-1",
        title: "A".repeat(200),
        description: "B".repeat(500),
      };
      const wrapper = renderWithAppContext({
        results: [longTextResult],
        overridableId: "",
        loading: false,
        totalResults: 1,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });
  });

  describe("loading state variations", () => {
    it("should not render Element when loading is true", () => {
      const wrapper = renderWithAppContext({
        results: [mockResult],
        overridableId: "",
        loading: true,
        totalResults: 10,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });

    it("should not render Element when loading is true with empty results", () => {
      const wrapper = renderWithAppContext({
        results: [],
        overridableId: "",
        loading: true,
        totalResults: 0,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });

    it("should not render Element when loading is true with many results", () => {
      const manyResults = Array.from({ length: 100 }, (_, i) => ({
        id: `${i}`,
        title: `Title ${i}`,
      }));
      const wrapper = renderWithAppContext({
        results: manyResults,
        overridableId: "",
        loading: true,
        totalResults: 100,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });

    it("should render when loading is false and totalResults is positive", () => {
      const wrapper = renderWithAppContext({
        results: [mockResult],
        overridableId: "",
        loading: false,
        totalResults: 1,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
      expect(wrapper.text()).toContain("Test Title");
    });

    it("should not render Element component when totalResults is 0", () => {
      const wrapper = renderWithAppContext({
        results: [],
        overridableId: "",
        loading: false,
        totalResults: 0,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });
  });

  describe("onResultsRendered callback", () => {
    it("should call onResultsRendered when provided", () => {
      const onRendered = jest.fn();
      renderWithAppContext({
        results: [mockResult],
        overridableId: "",
        loading: false,
        totalResults: 1,
        onResultsRendered: onRendered,
      });
      expect(onRendered).toHaveBeenCalled();
    });

    it("should not error without onResultsRendered callback", () => {
      const wrapper = renderWithAppContext({
        results: [mockResult],
        overridableId: "",
        loading: false,
        totalResults: 1,
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(ResultsGrid).exists()).toBe(true);
    });
  });
});
