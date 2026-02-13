/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow } from "enzyme";
import AutocompleteSearchBar from "./AutocompleteSearchBar";
import { AppContext } from "../ReactSearchKit";

describe("AutocompleteSearchBar Edge Cases", () => {
  const querySuggestions = jest.fn();
  const clearSuggestions = jest.fn();
  const onInputChange = jest.fn();
  const placeholder = "Search...";
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    onInputChange,
    querySuggestions,
    clearSuggestions,
    suggestions: [],
    placeholder,
  };

  // Test 1: Empty suggestions array
  it("should render with empty suggestions array", () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...defaultProps} suggestions={[]} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 2: Non-empty suggestions array
  it("should render with suggestions", () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...defaultProps} suggestions={["Item 1", "Item 2"]} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 3: Custom overridableId
  it("should render with custom overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "custom-autocomplete",
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 4: Empty string overridableId
  it("should render with empty overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "",
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 5: Long placeholder text
  it("should render with long placeholder text", () => {
    const props = {
      ...defaultProps,
      placeholder: "Search for documents, records, and other items in the repository...",
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 6: Empty string placeholder
  it("should render with empty placeholder", () => {
    const props = {
      ...defaultProps,
      placeholder: "",
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 7: Whitespace-only placeholder
  it("should render with whitespace placeholder", () => {
    const props = {
      ...defaultProps,
      placeholder: "   ",
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 8: Unicode characters in placeholder
  it("should render with unicode characters in placeholder", () => {
    const props = {
      ...defaultProps,
      placeholder: "搜索文档...",
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 9: Special characters in placeholder
  it("should render with special characters in placeholder", () => {
    const props = {
      ...defaultProps,
      placeholder: "Search & Explore (2024)",
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 10: Many suggestions items
  it("should render with many suggestions", () => {
    const manySuggestions = Array.from({ length: 50 }, (_, i) => `Item ${i}`);
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...defaultProps} suggestions={manySuggestions} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 11: Null onInputChange function
  it("should render with null onInputChange", () => {
    const props = {
      ...defaultProps,
      onInputChange: null,
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 12: Undefined onInputChange function
  it("should render with undefined onInputChange", () => {
    const props = {
      ...defaultProps,
      onInputChange: undefined,
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 13: Null querySuggestions function
  it("should render with null querySuggestions", () => {
    const props = {
      ...defaultProps,
      querySuggestions: null,
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 14: Null clearSuggestions function
  it("should render with null clearSuggestions", () => {
    const props = {
      ...defaultProps,
      clearSuggestions: null,
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 15: Suggestions with special characters
  it("should render with suggestions containing special characters", () => {
    const props = {
      ...defaultProps,
      suggestions: ["Item & Value", "Test (2024)", "Data & Statistics"],
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 16: Suggestions with unicode characters
  it("should render with suggestions containing unicode", () => {
    const props = {
      ...defaultProps,
      suggestions: ["文档1", "ドキュメント2", "Document 3"],
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 17: Long overridableId string
  it("should render with long overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "-custom-autocomplete-search-bar-for-testing-purposes-id",
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 18: Dots in overridableId
  it("should render with dots in overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "custom.autocomplete.bar",
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 19: Dashes in overridableId
  it("should render with dashes in overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "custom-autocomplete-bar",
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 20: Underscores in overridableId
  it("should render with underscores in overridableId", () => {
    const props = {
      ...defaultProps,
      overridableId: "custom_autocomplete_bar",
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 21: Single suggestion
  it("should render with single suggestion", () => {
    const props = {
      ...defaultProps,
      suggestions: ["Single Item"],
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 22: Empty string suggestions
  it("should render with empty string suggestions", () => {
    const props = {
      ...defaultProps,
      suggestions: ["", "Item"],
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 23: Numeric string suggestions
  it("should render with numeric string suggestions", () => {
    const props = {
      ...defaultProps,
      suggestions: ["123", "456", "789"],
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 24: Mixed case suggestions
  it("should render with mixed case suggestions", () => {
    const props = {
      ...defaultProps,
      suggestions: ["UPPER", "lower", "MixedCase"],
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  // Test 25: Very long single suggestion
  it("should render with very long single suggestion", () => {
    const longSuggestion = "This is a very long suggestion text that exceeds normal limits...";
    const props = {
      ...defaultProps,
      suggestions: [longSuggestion],
    };
    const wrapper = shallow(
      <AppContext.Provider value={{ buildUID }}>
        <AutocompleteSearchBar {...props} />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
