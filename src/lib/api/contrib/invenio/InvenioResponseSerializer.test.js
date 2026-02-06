/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { InvenioResponseSerializer } from "./InvenioResponseSerializer";

describe("InvenioResponseSerializer", () => {
  const serializer = new InvenioResponseSerializer();

  it("should exist and have serialize method", () => {
    expect(serializer).toBeDefined();
    expect(typeof serializer.serialize).toBe("function");
  });

  it("should serialize a complete response payload", () => {
    const payload = {
      hits: {
        hits: [
          { id: 1, title: "Result 1" },
          { id: 2, title: "Result 2" },
        ],
        total: 2,
      },
      aggregations: {
        type: {
          buckets: [
            { key: "paper", doc_count: 10 },
            { key: "book", doc_count: 5 },
          ],
        },
      },
      otherField: "value",
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
        { id: 1, title: "Result 1" },
        { id: 2, title: "Result 2" },
      ],
      total: 2,
      extras: {
        otherField: "value",
      },
    });
  });

  it("should handle response without aggregations", () => {
    const payload = {
      hits: {
        hits: [{ id: 1, title: "Result 1" }],
        total: 1,
      },
    };

    const result = serializer.serialize(payload);

    expect(result.aggregations).toEqual({});
    expect(result.hits).toEqual([{ id: 1, title: "Result 1" }]);
    expect(result.total).toBe(1);
    expect(result.extras).toEqual({});
  });

  it("should handle empty hits array", () => {
    const payload = {
      hits: {
        hits: [],
        total: 0,
      },
      aggregations: {},
    };

    const result = serializer.serialize(payload);

    expect(result.hits).toEqual([]);
    expect(result.total).toBe(0);
  });

  it("should handle payload with total count string (ES format)", () => {
    const payload = {
      hits: {
        hits: [],
        total: "0", // Elasticsearch returns string
      },
    };

    const result = serializer.serialize(payload);

    expect(result.total).toBe("0");
  });

  it("should include all extra fields in extras", () => {
    const payload = {
      hits: {
        hits: [],
        total: 0,
      },
      aggregations: {},
      field1: "value1",
      field2: 123,
      field3: { nested: true },
    };

    const result = serializer.serialize(payload);

    expect(result.extras).toEqual({
      field1: "value1",
      field2: 123,
      field3: { nested: true },
    });
  });

  it("should not mutate the original payload", () => {
    const payload = {
      hits: {
        hits: [{ id: 1 }],
        total: 1,
      },
      aggregations: {},
    };

    const payloadCopy = JSON.parse(JSON.stringify(payload));
    serializer.serialize(payload);

    expect(payload).toEqual(payloadCopy);
  });
});
