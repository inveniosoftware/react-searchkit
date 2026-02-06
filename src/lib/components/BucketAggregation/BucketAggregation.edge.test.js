/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { shallow } from "enzyme";
import BucketAggregation from "./BucketAggregation";

describe("BucketAggregation - edge cases", () => {
  const buildUID = (elementId, overridableId = "") =>
    overridableId ? `${elementId}.${overridableId}` : elementId;

  it("should render with empty aggregations", () => {
    const agg = {
      title: "Type",
      aggName: "type",
      field: "type",
    };
    const wrapper = shallow(
      <BucketAggregation
        agg={agg}
        resultsAggregations={{}}
        overridableId=""
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with empty buckets", () => {
    const agg = {
      title: "Type",
      aggName: "type",
      field: "type",
    };
    const wrapper = shallow(
      <BucketAggregation
        agg={agg}
        resultsAggregations={{ type: { buckets: [] } }}
        overridableId=""
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with selectedFilters = []", () => {
    const agg = {
      title: "Type",
      aggName: "type",
      field: "type",
    };
    const wrapper = shallow(
      <BucketAggregation
        agg={agg}
        resultsAggregations={{
          type: { buckets: [{ key: "publication", doc_count: 10 }] },
        }}
        selectedFilters={[]}
        overridableId=""
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render with multiple selectedFilters", () => {
    const agg = {
      title: "Type",
      aggName: "type",
      field: "type",
    };
    const wrapper = shallow(
      <BucketAggregation
        agg={agg}
        resultsAggregations={{
          type: { buckets: [{ key: "publication", doc_count: 10 }] },
        }}
        selectedFilters={[
          ["type", "publication"],
          ["subtype", "article"],
        ]}
        overridableId=""
        buildUID={buildUID}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });
});
