/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2026 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { DateTime } from "luxon";

/**
 * Extracts aggregation buckets by key from a results object.
 * @param {object} resultsAggregations
 * @param {string} key
 * @returns {Array}
 */
export function extractBuckets(resultsAggregations, key) {
  return resultsAggregations?.[key]?.buckets ?? [];
}

/**
 * Gets the bucket key, preferring key_as_string when present.
 * @param {object} bucket
 * @returns {string|number}
 */
export function getKey(bucket) {
  return bucket.key_as_string ? bucket.key_as_string : bucket.key;
}

/**
 * Builds histogram data between min and max (inclusive).
 * @param {Array} buckets
 * @param {number} min
 * @param {number} max
 * @returns {Array<{year: number, count: number}>}
 */
export function getHistogramData(buckets, min, max) {
  const map = new Map(buckets.map((b) => [Number(getKey(b)), b.doc_count]));

  const data = [];
  for (let y = min; y <= max; y++) {
    data.push({
      year: y,
      count: map.get(y) ?? 0,
    });
  }
  return data;
}

/**
 * Resolves a default range filter into a year range and ISO date range string.
 * @param {{type: string, value: number}} range
 * @param {number} min
 * @param {number} max
 * @param {string} rangeSeparator
 * @returns {{yearRange: [number, number], dateRangeString: string}|null}
 */
export function resolveDefaultRange(range, min, max, rangeSeparator) {
  const { type, value } = range;
  const today = DateTime.now();

  if (type === "years") {
    const from = today.minus({ years: value });

    return {
      yearRange: [Math.max(min, from.year), today.year],
      dateRangeString: from.toISODate() + rangeSeparator + today.toISODate(),
    };
  }

  if (type === "months") {
    const from = today.minus({ months: value });

    return {
      yearRange: [Math.max(min, from.year), today.year],
      dateRangeString: from.toISODate() + rangeSeparator + today.toISODate(),
    };
  }

  return null;
}

/**
 * Normalizes a filter value into a from-to ISO date range string.
 * @param {string} filterValue
 * @param {string} rangeSeparator
 * @param {number} minYear
 * @param {number} maxYear
 * @returns {string|null}
 */
export function normalizeFilterValue(filterValue, rangeSeparator, minYear, maxYear) {
  if (!filterValue) return null;

  const cleaned = String(filterValue)
    .replace(/[()[\]]/g, "")
    .trim();

  let fromRaw, toRaw;

  if (cleaned.includes(rangeSeparator)) {
    [fromRaw, toRaw] = cleaned.split(rangeSeparator);
  } else {
    fromRaw = cleaned;
    toRaw = cleaned;
  }

  const fromValue = fromRaw?.trim() || (minYear != null ? String(minYear) : "");

  const toValue = toRaw?.trim() || (maxYear != null ? String(maxYear) : "");

  if (!fromValue || !toValue) return null;

  const fromDate = DateTime.fromISO(fromValue);
  const toDate = DateTime.fromISO(toValue);

  if (!fromDate.isValid || !toDate.isValid) return null;

  return `${fromValue}${rangeSeparator}${toValue}`;
}

/**
 * Parses years from a filter value.
 * @param {string} filterValue
 * @param {string} rangeSeparator
 * @returns {{fromYear: number, toYear: number}|null}
 */
export function parseFilterYears(filterValue, rangeSeparator) {
  if (!filterValue) return null;
  const [fromPart, toPart] = filterValue.split(rangeSeparator);
  if (!fromPart || !toPart) return null;

  const fromYear = Number(fromPart.split("-")[0]);
  const toYear = Number(toPart.split("-")[0]);
  if (Number.isNaN(fromYear) || Number.isNaN(toYear)) return null;

  return { fromYear, toYear };
}

/**
 * Finds the label for a matching default range.
 * @param {Array} defaultRanges
 * @param {string} filterValue
 * @param {number} min
 * @param {number} max
 * @param {string} rangeSeparator
 * @returns {string|null}
 */
export function findDefaultLabel(defaultRanges, filterValue, min, max, rangeSeparator) {
  if (!defaultRanges?.length || !filterValue) return null;

  return (
    defaultRanges.find((rangeOption) => {
      const resolved = resolveDefaultRange(rangeOption, min, max, rangeSeparator);
      if (!resolved) return false;

      if (resolved.dateRangeString) {
        return filterValue === resolved.dateRangeString;
      }
      if (resolved.yearRange) {
        const [fromYear, toYear] = resolved.yearRange;
        return filterValue === `${fromYear}${rangeSeparator}${toYear}`;
      }
      return false;
    })?.label ?? null
  );
}

/**
 * Builds a range string from year/month/day inputs.
 * @param {object} args
 * @param {string|number} args.fromYear
 * @param {string|number} args.fromMonth
 * @param {string|number} args.fromDay
 * @param {string|number} args.toYear
 * @param {string|number} args.toMonth
 * @param {string|number} args.toDay
 * @param {string} args.rangeSeparator
 * @returns {string|null}
 */
export function buildDateRange({
  fromYear,
  fromMonth,
  fromDay,
  toYear,
  toMonth,
  toDay,
  rangeSeparator,
}) {
  if (!fromYear || !toYear) return null;

  const fy = Number(fromYear);
  const ty = Number(toYear);
  if (isNaN(fy) || isNaN(ty)) return null;

  const hasAnyDetail = fromMonth || fromDay || toMonth || toDay;

  if (!hasAnyDetail) {
    return `${fy}${rangeSeparator}${ty}`;
  }

  const from = DateTime.fromObject({
    year: fy,
    month: fromMonth ? Number(fromMonth) : 1,
    day: fromDay ? Number(fromDay) : 1,
  });

  const toBase = DateTime.fromObject({
    year: ty,
    month: toMonth ? Number(toMonth) : 12,
    day: 1,
  });

  const to = toDay ? toBase.set({ day: Number(toDay) }) : toBase.endOf("month");

  if (!from.isValid || !to.isValid) return null;

  return `${from.toISODate()}${rangeSeparator}${to.toISODate()}`;
}

/**
 * Range filter modes.
 * @type {Object.<string, string>}
 */
export const RANGE_MODES = Object.freeze({
  DEFAULT: "default",
  CUSTOM: "custom",
});
