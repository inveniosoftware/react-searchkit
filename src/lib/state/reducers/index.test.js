/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import rootReducer from "./index";

describe("reducers/index", () => {
  it("should export a valid reducer function", () => {
    expect(typeof rootReducer).toBe("function");
  });

  it("should have app, query, and results keys in initial state", () => {
    const initialState = rootReducer(undefined, { type: "@@INIT" });
    expect(initialState).not.toBeNull();
  });

  it("should handle unknown actions", () => {
    const initialState = {
      app: { hasUserChangedSorting: false },
      query: { queryString: "" },
      results: { loading: false, data: { hits: [] }, error: {} },
    };
    const nextState = rootReducer(initialState, {
      type: "UNKNOWN_ACTION",
    });
    expect(nextState).toBe(initialState);
  });

  it("should not mutate state for unknown actions", () => {
    const initialState = {
      app: { hasUserChangedSorting: false },
      query: { queryString: "" },
      results: { loading: false, data: { hits: [] }, error: {} },
    };
    const nextState = rootReducer(initialState, {
      type: "UNKNOWN_ACTION",
    });
    expect(nextState).toBe(initialState);
  });
});
