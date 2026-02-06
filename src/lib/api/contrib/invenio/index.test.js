/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import * as Invenio from "./index";

describe("invenio/index", () => {
  it("should export InvenioRequestSerializer", () => {
    expect(Invenio.InvenioRequestSerializer).toBeDefined();
  });

  it("should export InvenioResponseSerializer", () => {
    expect(Invenio.InvenioResponseSerializer).toBeDefined();
  });

  it("should export InvenioSearchApi", () => {
    expect(Invenio.InvenioSearchApi).toBeDefined();
  });

  it("should export InvenioSuggestionApi", () => {
    expect(Invenio.InvenioSuggestionApi).toBeDefined();
  });

  it("should export InvenioRecordsResourcesRequestSerializer", () => {
    expect(Invenio.InvenioRecordsResourcesRequestSerializer).toBeDefined();
  });
});
