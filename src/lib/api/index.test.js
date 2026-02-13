/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import * as Api from "./index";

describe("api/index", () => {
  it("should export UrlHandlerApi", () => {
    expect(Api.UrlHandlerApi).toBeDefined();
  });

  it("should export UrlParamValidator", () => {
    expect(Api.UrlParamValidator).toBeDefined();
  });

  it("should export OSRequestSerializer from contrib", () => {
    expect(Api.OSRequestSerializer).toBeDefined();
  });

  it("should export OSResponseSerializer from contrib", () => {
    expect(Api.OSResponseSerializer).toBeDefined();
  });

  it("should export OSSearchApi from contrib", () => {
    expect(Api.OSSearchApi).toBeDefined();
  });

  it("should export InvenioRequestSerializer from contrib", () => {
    expect(Api.InvenioRequestSerializer).toBeDefined();
  });

  it("should export InvenioResponseSerializer from contrib", () => {
    expect(Api.InvenioResponseSerializer).toBeDefined();
  });

  it("should export InvenioSearchApi from contrib", () => {
    expect(Api.InvenioSearchApi).toBeDefined();
  });

  it("should export InvenioSuggestionApi from contrib", () => {
    expect(Api.InvenioSuggestionApi).toBeDefined();
  });

  it("should export InvenioRecordsResourcesRequestSerializer from contrib", () => {
    expect(Api.InvenioRecordsResourcesRequestSerializer).toBeDefined();
  });
});
