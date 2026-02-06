/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { InvenioSuggestionApi } from "./InvenioSuggestionApi";

describe("InvenioSuggestionApi", () => {
  const validConfig = {
    axios: { url: "http://test.com" },
    invenio: {
      suggestions: {
        queryField: "title",
        responseField: "title",
      },
    },
  };

  it("should create instance with valid config", () => {
    expect(() => new InvenioSuggestionApi(validConfig)).not.toThrow();
  });

  it("should exist as class", () => {
    expect(InvenioSuggestionApi).toBeDefined();
    expect(typeof InvenioSuggestionApi).toBe("function");
  });

  it("should initialize request serializer with queryField", () => {
    const api = new InvenioSuggestionApi(validConfig);
    expect(api.requestSerializer).toBeDefined();
    expect(api.requestSerializer.queryField).toBe("title");
  });

  it("should serialize query correctly", () => {
    const api = new InvenioSuggestionApi(validConfig);
    const result = api.requestSerializer.serialize({ suggestionString: "test" });
    expect(result).toBe("q=title:test");
  });

  it("should serialize query with null suggestionString", () => {
    const api = new InvenioSuggestionApi(validConfig);
    const result = api.requestSerializer.serialize({ suggestionString: null });
    expect(result).toBe("");
  });

  it("should deserialize response correctly", () => {
    const api = new InvenioSuggestionApi(validConfig);
    const payload = {
      hits: {
        hits: [{ metadata: { title: "Paper 1" } }, { metadata: { title: "Paper 2" } }],
      },
    };
    const result = api.responseSerializer.serialize(payload);
    expect(result).toEqual({
      suggestions: ["Paper 1", "Paper 2"],
    });
  });

  it("should handle empty response", () => {
    const api = new InvenioSuggestionApi(validConfig);
    const payload = { hits: { hits: [] } };
    const result = api.responseSerializer.serialize(payload);
    expect(result).toEqual({
      suggestions: [],
    });
  });
});
