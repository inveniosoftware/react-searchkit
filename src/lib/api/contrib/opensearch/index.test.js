/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import * as OpenSearch from "./index";

describe("opensearch/index", () => {
  it("should export OSRequestSerializer", () => {
    expect(OpenSearch.OSRequestSerializer).toBeDefined();
  });

  it("should export OSResponseSerializer", () => {
    expect(OpenSearch.OSResponseSerializer).toBeDefined();
  });

  it("should export OSSearchApi", () => {
    expect(OpenSearch.OSSearchApi).toBeDefined();
  });
});
