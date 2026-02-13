/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import * as Contrib from "./index";

describe("contrib/index", () => {
  it("should export OSRequestSerializer from opensearch", () => {
    expect(Contrib.OSRequestSerializer).toBeDefined();
  });

  it("should export OSResponseSerializer from opensearch", () => {
    expect(Contrib.OSResponseSerializer).toBeDefined();
  });

  it("should export OSSearchApi from opensearch", () => {
    expect(Contrib.OSSearchApi).toBeDefined();
  });

  it("should export InvenioRequestSerializer from invenio", () => {
    expect(Contrib.InvenioRequestSerializer).toBeDefined();
  });

  it("should export InvenioResponseSerializer from invenio", () => {
    expect(Contrib.InvenioResponseSerializer).toBeDefined();
  });

  it("should export InvenioSearchApi from invenio", () => {
    expect(Contrib.InvenioSearchApi).toBeDefined();
  });

  it("should export InvenioSuggestionApi from invenio", () => {
    expect(Contrib.InvenioSuggestionApi).toBeDefined();
  });

  it("should export InvenioRecordsResourcesRequestSerializer from invenio", () => {
    expect(Contrib.InvenioRecordsResourcesRequestSerializer).toBeDefined();
  });
});
