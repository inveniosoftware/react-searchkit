/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2026 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  RANGE_MODES,
  buildDateRange,
  extractBuckets,
  findDefaultLabel,
  getHistogramData,
  normalizeFilterValue,
  parseFilterYears,
  resolveDefaultRange,
} from "./utils";

describe("RangeFacet utils", () => {
  it("extractBuckets returns buckets or empty array", () => {
    expect(extractBuckets(undefined, "year")).toEqual([]);
    expect(extractBuckets({}, "year")).toEqual([]);
    expect(
      extractBuckets(
        { year: { buckets: [{ key_as_string: "2020", doc_count: 1 }] } },
        "year"
      )
    ).toEqual([{ key_as_string: "2020", doc_count: 1 }]);
  });

  it("getHistogramData fills missing years", () => {
    const buckets = [
      { key_as_string: "2020", doc_count: 5 },
      { key_as_string: "2022", doc_count: 2 },
    ];
    expect(getHistogramData(buckets, 2020, 2022)).toEqual([
      { year: 2020, count: 5 },
      { year: 2021, count: 0 },
      { year: 2022, count: 2 },
    ]);
  });

  it("resolveDefaultRange handles years and months", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2020-12-31T12:00:00Z"));

    expect(
      resolveDefaultRange({ type: "years", value: 5 }, 2000, 2020, " to ")
    ).toEqual({
      yearRange: [2015, 2020],
      dateRangeString: "2015-12-31 to 2020-12-31",
    });

    jest.setSystemTime(new Date("2023-12-31T12:00:00Z"));

    expect(
      resolveDefaultRange({ type: "months", value: 3 }, 2020, 2023, " to ")
    ).toEqual({
      yearRange: [2023, 2023],
      dateRangeString: "2023-09-30 to 2023-12-31",
    });

    jest.useRealTimers();
  });

  it("parseFilterYears returns years for valid strings", () => {
    expect(parseFilterYears("2020 to 2022", " to ")).toEqual({
      fromYear: 2020,
      toYear: 2022,
    });
    expect(parseFilterYears("2020-01-01 to 2022-12-31", " to ")).toEqual({
      fromYear: 2020,
      toYear: 2022,
    });
    expect(parseFilterYears("invalid", " to ")).toBeNull();
  });

  it("findDefaultLabel resolves labels from filter values", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-12-31T12:00:00Z"));

    const defaultRanges = [
      { label: "Last 2 years", type: "years", value: 2 },
      { label: "Last 3 months", type: "months", value: 3 },
    ];
    expect(
      findDefaultLabel(defaultRanges, "2021-12-31 to 2023-12-31", 2020, 2023, " to ")
    ).toBe("Last 2 years");
    expect(
      findDefaultLabel(defaultRanges, "2023-09-30 to 2023-12-31", 2020, 2023, " to ")
    ).toBe("Last 3 months");
    expect(
      findDefaultLabel(defaultRanges, "2010 to 2011", 2020, 2021, " to ")
    ).toBeNull();

    jest.useRealTimers();
  });

  it("buildDateRange builds year-only and full ranges", () => {
    expect(
      buildDateRange({
        fromYear: 2020,
        toYear: 2021,
        rangeSeparator: "..",
      })
    ).toBe("2020..2021");

    expect(
      buildDateRange({
        fromYear: "2020",
        fromMonth: "2",
        toYear: "2021",
        rangeSeparator: "--",
      })
    ).toBe("2020-02-01--2021-12-31");

    expect(
      buildDateRange({
        fromYear: "abcd",
        toYear: "2021",
        rangeSeparator: " to ",
      })
    ).toBeNull();
  });

  it("normalizeFilterValue validates real dates and years", () => {
    expect(normalizeFilterValue("2020 to 2022", " to ", 2000, 2030)).toBe(
      "2020 to 2022"
    );
    expect(normalizeFilterValue("2024-02-29 to 2024-03-01", " to ", 2000, 2030)).toBe(
      "2024-02-29 to 2024-03-01"
    );
    expect(
      normalizeFilterValue("2024-02-30 to 2024-03-01", " to ", 2000, 2030)
    ).toBeNull();
    expect(normalizeFilterValue("2011.2015", " to ", 2000, 2030)).toBeNull();
  });

  it("exposes RANGE_MODES", () => {
    expect(RANGE_MODES).toEqual({ DEFAULT: "default", CUSTOM: "custom" });
  });
});
