/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { InvenioSuggestionApi } from ".";

describe("test InvenioSuggestionApi class", () => {
  it("should throw when `invenio.suggestions.queryField` is missing", () => {
    expect(
      () =>
        new InvenioSuggestionApi({
          axios: {
            url: "/api/records",
          },
          invenio: {
            suggestions: {
              responseField: "metadata.title",
            },
          },
        })
    ).toThrow(
      "InvenioSuggestionApi config: `invenio.suggestions.queryField` is required."
    );
  });

  it("should throw when `invenio.suggestions.responseField` is missing", () => {
    expect(
      () =>
        new InvenioSuggestionApi({
          axios: {
            url: "/api/records",
          },
          invenio: {
            suggestions: {
              queryField: "title",
            },
          },
        })
    ).toThrow(
      "InvenioSuggestionApi config: `invenio.suggestions.responseField` is required."
    );
  });

  it("should not throw when both suggestion fields are provided", () => {
    expect(
      () =>
        new InvenioSuggestionApi({
          axios: {
            url: "/api/records",
          },
          invenio: {
            suggestions: {
              queryField: "title",
              responseField: "metadata.title",
            },
          },
        })
    ).not.toThrow();
  });
});
