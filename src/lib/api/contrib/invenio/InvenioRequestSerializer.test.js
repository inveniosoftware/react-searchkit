/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { InvenioRequestSerializer } from ".";

describe("test InvenioRequestSerializer serializer", () => {
  const serializer = new InvenioRequestSerializer();

  it("should serialize the query field", () => {
    const queryState = {
      queryString: "test",
      page: 0,
      size: 0,
      filters: [],
    };
    const strState = serializer.serialize(queryState);
    expect(strState).toBe("q=test");
  });

  it("should serialize the sort by field", () => {
    const queryState = {
      queryString: "test",
      sortBy: "name",
      page: 0,
      size: 0,
      filters: [],
    };
    const strState = serializer.serialize(queryState);
    expect(strState).toBe("q=test&sort=name");
  });

  it("should serialize the sort order field with asc value", () => {
    const queryState = {
      queryString: "test",
      sortBy: "name",
      sortOrder: "asc",
      page: 0,
      size: 0,
      filters: [],
    };
    const strState = serializer.serialize(queryState);
    expect(strState).toBe("q=test&sort=name");
  });

  it("should serialize the sort order field with desc value", () => {
    const queryState = {
      queryString: "test",
      sortBy: "name",
      sortOrder: "desc",
      page: 0,
      size: 0,
      filters: [],
    };
    const strState = serializer.serialize(queryState);
    expect(strState).toBe("q=test&sort=-name");
  });

  it("should serialize the page field", () => {
    const queryState = {
      queryString: "test",
      sortBy: "name",
      page: 2,
      size: 0,
      filters: [],
    };
    const strState = serializer.serialize(queryState);
    expect(strState).toBe("q=test&sort=name&page=2");
  });

  it("should serialize the size field", () => {
    const queryState = {
      queryString: "test",
      sortBy: "name",
      page: 2,
      size: 20,
      filters: [],
    };
    const strState = serializer.serialize(queryState);
    expect(strState).toBe("q=test&sort=name&page=2&size=20");
  });

  it("should serialize the one simple filter", () => {
    const queryState = {
      queryString: "test",
      page: 0,
      size: 0,
      filters: [["agg-type", "report"]],
    };
    const strState = serializer.serialize(queryState);
    expect(strState).toBe("q=test&agg-type=report");
  });

  it("should serialize the multiple filters", () => {
    const queryState = {
      queryString: "test",
      page: 0,
      size: 0,
      filters: [
        ["type", "report"],
        ["category", "video"],
      ],
    };
    const strState = serializer.serialize(queryState);
    expect(strState).toBe("q=test&type=report&category=video");
  });

  it("should serialize nested filters", () => {
    const queryState = {
      queryString: "test",
      page: 0,
      size: 0,
      filters: [
        ["type", "report", ["subtype", "pdf"]],
        ["category", "video"],
      ],
    };
    const strState = serializer.serialize(queryState);
    expect(strState).toBe("q=test&type=report%3A%3Apdf&category=video");
  });

  it("should serialize multiple nested filters", () => {
    const queryState = {
      queryString: "test",
      page: 0,
      size: 0,
      filters: [
        ["type", "report", ["subtype", "pdf"]],
        ["type", "report", ["subtype", "doc"]],
        ["category", "video"],
      ],
    };
    const strState = serializer.serialize(queryState);
    expect(strState).toBe(
      "q=test&type=report%3A%3Apdf&type=report%3A%3Adoc&category=video"
    );
  });

  it("should fail when filters have wrong format", () => {
    [
      [["wrong=format"]],
      [
        ["type", "report", "wrong=format"],
        ["category", "video"],
      ],
      [["type", "report"], ["category"]],
    ].forEach((filters) => {
      const queryState = {
        queryString: "test",
        page: 0,
        size: 0,
        filters: filters,
      };

      expect(() => {
        serializer.serialize(queryState);
      }).toThrow();
    });
  });
});
