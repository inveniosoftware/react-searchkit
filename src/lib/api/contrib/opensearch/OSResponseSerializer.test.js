/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { OSResponseSerializer } from "./OSResponseSerializer";

describe("OSResponseSerializer", () => {
  let serializer;

  beforeEach(() => {
    serializer = new OSResponseSerializer();
  });

  it("should create instance", () => {
    expect(serializer).toBeDefined();
    expect(serializer.serialize).toBeInstanceOf(Function);
  });

  it("should serialize response with hits and aggregations", () => {
    const payload = {
      aggregations: {
        type: {
          buckets: [
            { key: "paper", doc_count: 10 },
            { key: "book", doc_count: 5 },
          ],
        },
      },
      hits: {
        total: {
          value: 15,
        },
        hits: [
          {
            _source: { id: 1, title: "Test 1" },
          },
          {
            _source: { id: 2, title: "Test 2" },
          },
        ],
      },
    };

    const result = serializer.serialize(payload);

    expect(result).toEqual({
      aggregations: {
        type: {
          buckets: [
            { key: "paper", doc_count: 10 },
            { key: "book", doc_count: 5 },
          ],
        },
      },
      hits: [
        { id: 1, title: "Test 1" },
        { id: 2, title: "Test 2" },
      ],
      total: 15,
    });
  });

  it("should serialize response without aggregations", () => {
    const payload = {
      hits: {
        total: {
          value: 5,
        },
        hits: [
          {
            _source: { id: 1, title: "Test 1" },
          },
        ],
      },
    };

    const result = serializer.serialize(payload);

    expect(result).toEqual({
      aggregations: {},
      hits: [{ id: 1, title: "Test 1" }],
      total: 5,
    });
  });

  it("should serialize response with empty hits", () => {
    const payload = {
      hits: {
        total: {
          value: 0,
        },
        hits: [],
      },
    };

    const result = serializer.serialize(payload);

    expect(result).toEqual({
      aggregations: {},
      hits: [],
      total: 0,
    });
  });

  it("should have serialize method bound to instance", () => {
    expect(typeof serializer.serialize).toBe("function");
    // The constructor binds serialize to `this`, so it should work when called
    const payload = {
      hits: {
        total: { value: 0 },
        hits: [],
      },
    };
    expect(() => serializer.serialize(payload)).not.toThrow();
  });
});
