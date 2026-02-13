/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import queryReducer from "./query";
import { INITIAL_QUERY_STATE } from "../../storeConfig";

describe("queryReducer", () => {
  const initialState = {
    queryString: "",
    suggestions: [],
    sortBy: null,
    sortOrder: null,
    page: -1,
    size: -1,
    filters: [],
    hiddenParams: [],
    layout: null,
    _sortUserChanged: false,
  };

  it("should return empty state for undefined state with unknown action", () => {
    expect(queryReducer(undefined, { type: "UNKNOWN" })).toEqual({});
  });

  it("should handle SET_QUERY_STRING action", () => {
    const action = { type: "SET_QUERY_STRING", payload: "test query" };
    const nextState = queryReducer(initialState, action);

    expect(nextState.queryString).toBe("test query");
    expect(nextState.page).toBe(1);
  });

  it("should handle SET_QUERY_SORT_BY action", () => {
    const action = { type: "SET_QUERY_SORT_BY", payload: "bestmatch" };
    const nextState = queryReducer(initialState, action);

    expect(nextState.sortBy).toBe("bestmatch");
    expect(nextState._sortUserChanged).toBe(true);
  });

  it("should handle SET_QUERY_SORT_ORDER action", () => {
    const action = { type: "SET_QUERY_SORT_ORDER", payload: "asc" };
    const nextState = queryReducer(initialState, action);

    expect(nextState.sortOrder).toBe("asc");
    expect(nextState._sortUserChanged).toBe(true);
  });

  it("should handle SET_QUERY_STATE action", () => {
    const newState = {
      queryString: "new query",
      sortBy: "name",
      sortOrder: "desc",
      page: 2,
      size: 20,
    };
    const action = { type: "SET_QUERY_STATE", payload: newState };
    const nextState = queryReducer(initialState, action);

    expect(nextState.queryString).toBe("new query");
    expect(nextState.sortBy).toBe("name");
    expect(nextState.sortOrder).toBe("desc");
    expect(nextState.page).toBe(2);
    expect(nextState.size).toBe(20);
  });

  it("should handle RESET_QUERY action with provided payload", () => {
    const currentState = {
      ...initialState,
      queryString: "test",
      sortBy: "name",
      page: 5,
    };
    const action = { type: "RESET_QUERY", payload: { ...INITIAL_QUERY_STATE } };
    const nextState = queryReducer(currentState, action);

    expect(nextState.queryString).toBe("");
    expect(nextState.sortBy).toBe(null);
    expect(nextState.sortOrder).toBe(null);
    expect(nextState.page).toBe(-1);
    expect(nextState.size).toBe(-1);
  });

  it("should handle SET_QUERY_SUGGESTIONS action", () => {
    const action = {
      type: "SET_QUERY_SUGGESTIONS",
      payload: {
        suggestions: [{ id: 1, text: "suggestion1" }],
        suggestionString: "partial",
      },
    };
    const nextState = queryReducer(initialState, action);

    expect(nextState.suggestions).toEqual([{ id: 1, text: "suggestion1" }]);
  });

  it("should handle SET_SUGGESTION_STRING action", () => {
    const action = { type: "SET_SUGGESTION_STRING", payload: "partial" };
    const nextState = queryReducer(initialState, action);

    expect(nextState.suggestionString).toBe("partial");
  });

  it("should handle CLEAR_QUERY_SUGGESTIONS action", () => {
    const currentState = {
      ...initialState,
      suggestions: [{ id: 1, text: "test" }],
      suggestionString: "test",
    };
    const action = {
      type: "CLEAR_QUERY_SUGGESTIONS",
      payload: {
        suggestions: [],
      },
    };
    const nextState = queryReducer(currentState, action);

    expect(nextState.suggestions).toEqual([]);
    expect(nextState.suggestionString).toBe("test"); // suggestionString is not cleared by this action
  });

  it("should handle SET_QUERY_PAGINATION_PAGE action", () => {
    const action = { type: "SET_QUERY_PAGINATION_PAGE", payload: 3 };
    const nextState = queryReducer(initialState, action);

    expect(nextState.page).toBe(3);
  });

  it("should handle SET_QUERY_PAGINATION_SIZE action", () => {
    const action = { type: "SET_QUERY_PAGINATION_SIZE", payload: 25 };
    const nextState = queryReducer(initialState, action);

    expect(nextState.size).toBe(25);
  });

  it("should handle SET_QUERY_FILTERS action", () => {
    const filters = [
      ["type", "paper"],
      ["status", "open"],
    ];
    const action = { type: "SET_QUERY_FILTERS", payload: filters };
    const nextState = queryReducer(initialState, action);

    expect(nextState.filters).toEqual(filters);
  });

  it("should return unchanged state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const nextState = queryReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it("should not mutate the existing state", () => {
    const currentState = { ...initialState };
    const action = { type: "SET_QUERY_STRING", payload: "test" };
    const nextState = queryReducer(currentState, action);

    expect(nextState).not.toBe(currentState);
    expect(currentState.queryString).toBe("");
  });
});
