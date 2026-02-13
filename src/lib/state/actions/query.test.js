/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import expect from "expect";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  clearSuggestions,
  executeSuggestionQuery,
  executeQuery,
  onAppInitialized,
  resetQuery,
  setInitialState,
  updateQueryFilters,
  updateQueryPaginationPage,
  updateQueryPaginationSize,
  updateQuerySortBy,
  updateQuerySortOrder,
  updateQueryString,
  updateQuerySorting,
  updateQueryState,
  updateQueryStateFromUrl,
  updateResultsLayout,
  updateSuggestions,
} from ".";
import { createStoreWithConfig } from "../../store";
import {
  CLEAR_QUERY_SUGGESTIONS,
  RESULTS_FETCH_ERROR,
  RESULTS_FETCH_SUCCESS,
  RESULTS_LOADING,
  RESULTS_UPDATE_LAYOUT,
  SET_QUERY_COMPONENT_INITIAL_STATE,
  SET_QUERY_FILTERS,
  SET_QUERY_PAGINATION_SIZE,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_SORTING,
  SET_QUERY_STATE,
  SET_QUERY_STRING,
} from "../types";

let urlHandlerApiGet = jest.fn();
let urlHandlerApiSet = jest.fn();
let urlHandlerApiReplace = jest.fn();
class FakeUrlHandlerApi {
  get(queryState) {
    return urlHandlerApiGet(queryState);
  }
  set(params) {
    return urlHandlerApiSet(params);
  }
  replace(params) {
    return urlHandlerApiReplace(params);
  }
}

beforeEach(() => {
  urlHandlerApiGet.mockImplementation((queryState) => queryState);
  urlHandlerApiSet.mockImplementation((params) => params);
  urlHandlerApiReplace.mockImplementation((params) => params);
});

let mockedStore;
afterEach(() => {
  mockedStore.clearActions();
  urlHandlerApiGet.mockClear();
  urlHandlerApiSet.mockClear();
  urlHandlerApiReplace.mockClear();
});

describe("test actions that update query state", () => {
  const config = {
    urlHandlerApi: null,
    searchApi: {
      search: () => ({
        aggregations: [],
        hits: [],
        total: 0,
      }),
    },
  };
  const middlewares = [thunk.withExtraArgument(config)];
  const storeMocker = configureMockStore(middlewares);

  const initialState = {
    queryString: "",
    sortBy: null,
    sortOrder: null,
    page: null,
    size: null,
    aggregations: [],
    layout: null,
  };
  beforeEach(() => {
    mockedStore = storeMocker({
      query: initialState,
    });
  });

  it("fires a set initial state action", async () => {
    const initialState = { queryString: "this is my message" };
    const expectedActions = [
      {
        type: SET_QUERY_COMPONENT_INITIAL_STATE,
        payload: initialState,
      },
    ];

    await mockedStore.dispatch(setInitialState(initialState));
    const actions = mockedStore.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });

  it("executes a search after app init", async () => {
    const expectedActions = [
      {
        type: RESULTS_LOADING,
      },
      {
        type: RESULTS_FETCH_SUCCESS,
      },
    ];

    await mockedStore.dispatch(onAppInitialized(true));
    const actions = mockedStore.getActions();

    expect(actions[0].type).toEqual(expectedActions[0].type);
    expect(actions[1].type).toEqual(expectedActions[1].type);
  });

  it("updates the query state with a new query string", async () => {
    const newQueryString = "this is my message";
    const expectedActions = [
      {
        type: SET_QUERY_STRING,
        payload: newQueryString,
      },
    ];

    await mockedStore.dispatch(updateQueryString(newQueryString));
    const actions = mockedStore.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });

  it("updates the query state with a new sortBy value", async () => {
    const newSortBy = "mostrecent";
    const expectedActions = [
      {
        type: SET_QUERY_SORT_BY,
        payload: newSortBy,
      },
    ];

    await mockedStore.dispatch(updateQuerySortBy(newSortBy));
    const actions = mockedStore.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });

  it("updates the query state with a new sortOrder value", async () => {
    const newSortOrder = "desc";
    const expectedActions = [
      {
        type: SET_QUERY_SORT_ORDER,
        payload: newSortOrder,
      },
    ];

    await mockedStore.dispatch(updateQuerySortOrder(newSortOrder));
    const actions = mockedStore.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });
});

describe("test action that executes a search", () => {
  it("should update the result state with the returned results", async () => {
    const RESULTS = {
      aggregations: [],
      hits: [],
      total: 1,
    };
    const configNoURLhandler = {
      urlHandlerApi: null,
      searchApi: {
        search: () => RESULTS,
      },
      initialQueryState: {},
    };
    const store = createStoreWithConfig(configNoURLhandler);
    const QUERY_STATE = {
      queryString: "text",
    };
    store.getState().query = QUERY_STATE;

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    const queryState = store.getState().query;
    expect(queryState).toMatchObject(QUERY_STATE);
    const resultsState = store.getState().results;
    expect(resultsState).toMatchObject({
      data: RESULTS,
      error: {},
      loading: false,
    });
  });

  it("should update the result state with the returned error", async () => {
    const configNoURLhandler = {
      urlHandlerApi: null,
      searchApi: {
        search: () => {
          throw Error("Ignore this error! Error wanted to test error response");
        },
      },
      initialQueryState: {},
    };
    const store = createStoreWithConfig(configNoURLhandler);
    const QUERY_STATE = {
      queryString: "text",
    };
    store.getState().query = QUERY_STATE;

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    const queryState = store.getState().query;
    expect(queryState).toMatchObject(QUERY_STATE);
    const resultsState = store.getState().results;
    expect(resultsState).toMatchObject({
      data: {},
      error: Error("Ignore this error! Error wanted to test error response"),
      loading: false,
    });
  });
});

describe("test execute search updating URL params", () => {
  const configWithURLhandler = {
    urlHandlerApi: new FakeUrlHandlerApi(),
    searchApi: {
      search: () => ({
        aggregations: [],
        hits: [],
        total: 1,
      }),
    },
  };

  it("should change URL params (adds history)", async () => {
    const store = createStoreWithConfig(configWithURLhandler);
    store.getState().query.queryString = "text";

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: true,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(urlHandlerApiSet).toHaveBeenCalled();
    expect(urlHandlerApiReplace).not.toHaveBeenCalled();
    const call = urlHandlerApiSet.mock.calls[0][0];
    expect(call.queryString).toEqual("text");
  });

  it("should replace URL params (replaces history)", async () => {
    const store = createStoreWithConfig(configWithURLhandler);
    store.getState().query.queryString = "another text";

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: true,
        shouldReplaceUrlQueryString: true,
      })
    );

    expect(urlHandlerApiReplace).toHaveBeenCalled();
    expect(urlHandlerApiSet).not.toHaveBeenCalled();
    const call = urlHandlerApiReplace.mock.calls[0][0];
    expect(call.queryString).toEqual("another text");

    urlHandlerApiReplace.mockClear();

    // test different combination of params
    store.getState().query.queryString = "another text 2";

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: true,
      })
    );

    expect(urlHandlerApiReplace).toHaveBeenCalled();
    expect(urlHandlerApiSet).not.toHaveBeenCalled();
    const call2 = urlHandlerApiReplace.mock.calls[0][0];
    expect(call2.queryString).toEqual("another text 2");
  });
});

describe("test execute search changing sorting", () => {
  const configNoURLhandler = {
    urlHandlerApi: null,
    searchApi: {
      search: () => ({
        aggregations: [],
        hits: [],
        total: 1,
      }),
    },
    initialQueryState: {
      sortBy: "bestmatch",
      sortOrder: "desc",
    },
    defaultSortingOnEmptyQueryString: {
      sortBy: "mostrecent",
      sortOrder: "asc",
    },
  };

  it("should use initial sorting when query string is not empty and user did not change sorting", async () => {
    const store = createStoreWithConfig(configNoURLhandler);
    store.getState().query.queryString = "text";

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: "text",
      sortBy: "bestmatch",
      sortOrder: "desc",
    });
  });

  it("should use defaultSortingOnEmptyQueryString sorting when query string is empty and user did not change sorting", async () => {
    const store = createStoreWithConfig(configNoURLhandler);
    store.getState().query.queryString = "";

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: "",
      sortBy: "mostrecent",
      sortOrder: "asc",
    });
  });

  it("should use sorting depending on query string value and when user did not change sorting", async () => {
    const store = createStoreWithConfig(configNoURLhandler);

    // 1: query string empty, use defaultSortingOnEmptyQueryString
    store.getState().query.queryString = "";

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: "",
      sortBy: "mostrecent",
      sortOrder: "asc",
    });

    // 2: user set query string, use default sorting
    store.getState().query.queryString = "text";

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: "text",
      sortBy: "bestmatch",
      sortOrder: "desc",
    });

    // 3: user cleaned empty string, use defaultSortingOnEmptyQueryString
    store.getState().query.queryString = "";

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: "",
      sortBy: "mostrecent",
      sortOrder: "asc",
    });
  });

  it("should use sorting selected by the user independently of the query string value", async () => {
    const store = createStoreWithConfig(configNoURLhandler);
    store.getState().app.hasUserChangedSorting = true;

    // 1: user changes sorting and set query string
    store.getState().query.queryString = "text";
    store.getState().query.sortBy = "mostpopular";
    store.getState().query.sortOrder = "asc";

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: "text",
      sortBy: "mostpopular",
      sortOrder: "asc",
    });

    // 2: user changes sorting and cleaned query string
    store.getState().query.queryString = "";
    store.getState().query.sortBy = "mostpopular";
    store.getState().query.sortOrder = "asc";

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: "",
      sortBy: "mostpopular",
      sortOrder: "asc",
    });
  });
});

describe("execute search with specific sorting from URL params", () => {
  const configWithURLhandler = {
    urlHandlerApi: new FakeUrlHandlerApi(),
    searchApi: {
      search: () => ({
        aggregations: [],
        hits: [],
        total: 1,
      }),
    },
    initialQueryState: {
      sortBy: "bestmatch",
      sortOrder: "desc",
    },
    defaultSortingOnEmptyQueryString: {
      sortBy: "mostrecent",
      sortOrder: "asc",
    },
  };

  it("should use the specific sorting from URL params on empty query string", async () => {
    // specific sorting from URL params
    urlHandlerApiGet = jest.fn();
    urlHandlerApiGet.mockImplementation((queryState) => ({
      ...queryState,
      sortBy: "alphabetically",
      sortOrder: "asc",
    }));

    const store = createStoreWithConfig(configWithURLhandler);

    store.getState().query.queryString = "";

    await store.dispatch(executeQuery());

    expect(store.getState().query).toMatchObject({
      queryString: "",
      sortBy: "alphabetically",
      sortOrder: "asc",
    });
  });

  it("should use the specific sorting from URL params on query string defined", async () => {
    // specific sorting from URL params
    urlHandlerApiGet = jest.fn();
    urlHandlerApiGet.mockImplementation((queryState) => ({
      ...queryState,
      sortBy: "alphabetically",
      sortOrder: "asc",
    }));

    const store = createStoreWithConfig(configWithURLhandler);

    store.getState().query.queryString = "text";

    await store.dispatch(executeQuery());

    expect(store.getState().query).toMatchObject({
      queryString: "text",
      sortBy: "alphabetically",
      sortOrder: "asc",
    });
  });
});

describe("test execute search and get new query state in response", () => {
  const configNoURLhandler = {
    urlHandlerApi: null,
    searchApi: {
      search: () => ({
        aggregations: [],
        hits: [],
        total: 1,
        newQueryState: {
          queryString: "changed text",
          sortBy: "anotherSortBy",
          sortOrder: "anotherSortOrder",
          wrong: "non-existing query state key",
        },
      }),
    },
    initialQueryState: {
      sortBy: "bestmatch",
      sortOrder: "desc",
    },
  };

  it("execute search and change query state when response contains a new query state", async () => {
    const store = createStoreWithConfig(configNoURLhandler);
    store.getState().query.queryString = "text";

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: "changed text",
      sortBy: "anotherSortBy",
      sortOrder: "anotherSortOrder",
    });
  });

  it("execute search and change query state and URL params when response contains a new query state", async () => {
    const store = createStoreWithConfig({
      ...configNoURLhandler,
      urlHandlerApi: new FakeUrlHandlerApi(),
    });
    store.getState().query.queryString = "text";

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    const EXPECTED_QUERY_STATE = {
      queryString: "changed text",
      sortBy: "anotherSortBy",
      sortOrder: "anotherSortOrder",
    };
    expect(store.getState().query).toMatchObject(EXPECTED_QUERY_STATE);

    const newQueryState = {
      ...store.getState().query,
      ...EXPECTED_QUERY_STATE,
    };
    expect(urlHandlerApiReplace).toHaveBeenCalledWith(newQueryState);
  });
});

describe("action creators - additional test coverage", () => {
  const RESULTS = {
    aggregations: [],
    hits: [],
    total: 1,
  };

  beforeAll(() => {
    // Ensure all action types are available
  });

  describe("setInitialState", () => {
    it("should dispatch SET_QUERY_COMPONENT_INITIAL_STATE action", () => {
      const initialState = { queryString: "test", page: 1 };
      const action = setInitialState(initialState);
      const dispatch = jest.fn();

      action(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: SET_QUERY_COMPONENT_INITIAL_STATE,
        payload: initialState,
      });
    });
  });

  describe("updateQueryString", () => {
    it("should update query string in state", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          queryString: "",
          page: 1,
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(updateQueryString("test query"));

      expect(store.getState().query.queryString).toBe("test query");
    });
  });

  describe("updateQuerySortBy", () => {
    it("should update sortBy in state", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          sortBy: "bestmatch",
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(updateQuerySortBy("newest"));

      expect(store.getState().query.sortBy).toBe("newest");
    });
  });

  describe("updateQuerySortOrder", () => {
    it("should update sortOrder in state", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          sortBy: "bestmatch",
          sortOrder: "asc",
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(updateQuerySortOrder("desc"));

      expect(store.getState().query.sortOrder).toBe("desc");
    });
  });

  describe("updateQueryState", () => {
    it("should update query state and execute query", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          queryString: "",
          page: 1,
        },
      };
      const store = createStoreWithConfig(config);

      const newQueryState = { queryString: "test", page: 2 };
      await store.dispatch(updateQueryState(newQueryState));

      expect(store.getState().query.queryString).toBe("test");
      expect(store.getState().query.page).toBe(2);
    });
  });

  describe("updateQuerySorting", () => {
    it("should update sortBy and sortOrder and execute query", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          sortBy: "bestmatch",
          sortOrder: "asc",
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(updateQuerySorting("newest", "desc"));

      expect(store.getState().query.sortBy).toBe("newest");
      expect(store.getState().query.sortOrder).toBe("desc");
    });

    it("should update with undefined sortOrder", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          sortBy: "bestmatch",
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(updateQuerySorting("oldest", undefined));

      expect(store.getState().query.sortBy).toBe("oldest");
    });
  });

  describe("updateQueryPaginationSize", () => {
    it("should update pagination size and execute query", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          size: 10,
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(updateQueryPaginationSize(25));

      expect(store.getState().query.size).toBe(25);
    });
  });

  describe("updateQueryPaginationPage", () => {
    it("should update pagination page and execute query", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          page: 1,
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(updateQueryPaginationPage(5));

      expect(store.getState().query.page).toBe(5);
    });
  });

  describe("updateQueryFilters", () => {
    it("should update filters and execute query", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          filters: [],
        },
      };
      const store = createStoreWithConfig(config);

      const filters = [["type", "book"]];
      await store.dispatch(updateQueryFilters(filters));

      expect(store.getState().query.filters).toEqual(filters);
    });
  });

  describe("updateResultsLayout", () => {
    it("should update layout and call urlHandlerApi.set when urlHandlerApi exists", async () => {
      class UrlHandler {
        get() {
          return { queryString: "" };
        }
        set() {}
      }

      const urlHandler = new UrlHandler();
      const setSpy = jest.spyOn(urlHandler, "set");

      const config = {
        urlHandlerApi: urlHandler,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          queryString: "",
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(updateResultsLayout("grid"));

      expect(store.getState().query.layout).toBe("grid");
      expect(setSpy).toHaveBeenCalled();

      setSpy.mockRestore();
    });

    it("should update layout without urlHandlerApi when urlHandlerApi is null", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          queryString: "",
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(updateResultsLayout("list"));

      expect(store.getState().query.layout).toBe("list");
    });
  });

  describe("resetQuery", () => {
    it("should reset query to initial state", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          queryString: "",
          page: 1,
          sortBy: "bestmatch",
          sortOrder: "asc",
        },
        app: {
          initialSortBy: "bestmatch",
          initialSortOrder: "asc",
        },
      };
      const store = createStoreWithConfig(config);

      // First modify the state
      await store.dispatch(updateQueryString("test"));
      expect(store.getState().query.queryString).toBe("test");

      // Then reset
      await store.dispatch(resetQuery());
      expect(store.getState().query.queryString).toBe("");
    });
  });

  describe("executeQuery with URL options", () => {
    it("should call urlHandlerApi.replace when shouldReplaceUrlQueryString is true", async () => {
      class UrlHandler {
        get() {
          return { queryString: "test" };
        }
        set() {}
        replace() {}
      }

      const urlHandler = new UrlHandler();
      const replaceSpy = jest.spyOn(urlHandler, "replace");
      const setSpy = jest.spyOn(urlHandler, "set");

      const config = {
        urlHandlerApi: urlHandler,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          queryString: "test",
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(
        executeQuery({
          shouldReplaceUrlQueryString: true,
        })
      );

      expect(replaceSpy).toHaveBeenCalled();
      expect(setSpy).not.toHaveBeenCalled();

      replaceSpy.mockRestore();
      setSpy.mockRestore();
    });

    it("should call urlHandlerApi.set when shouldReplaceUrlQueryString is false and shouldUpdateUrlQueryString is true", async () => {
      class UrlHandler {
        get() {
          return { queryString: "test" };
        }
        set() {}
        replace() {}
      }

      const urlHandler = new UrlHandler();
      const replaceSpy = jest.spyOn(urlHandler, "replace");
      const setSpy = jest.spyOn(urlHandler, "set");

      const config = {
        urlHandlerApi: urlHandler,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          queryString: "test",
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(
        executeQuery({
          shouldReplaceUrlQueryString: false,
          shouldUpdateUrlQueryString: true,
        })
      );

      expect(setSpy).toHaveBeenCalled();
      expect(replaceSpy).not.toHaveBeenCalled();

      replaceSpy.mockRestore();
      setSpy.mockRestore();
    });
  });

  describe("executeSuggestionQuery", () => {
    it("should handle suggestion API errors gracefully", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        suggestionApi: {
          search: () => Promise.reject(new Error("Suggestion failed")),
        },
        initialQueryState: {
          queryString: "",
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(executeSuggestionQuery());

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Could not load suggestions")
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe("clearSuggestions", () => {
    it("should dispatch CLEAR_QUERY_SUGGESTIONS action", () => {
      const dispatch = jest.fn();
      clearSuggestions()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: CLEAR_QUERY_SUGGESTIONS,
        payload: {
          suggestions: [],
        },
      });
    });
  });

  describe("updateSuggestions", () => {
    it("should update suggestion string and execute suggestion query", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        suggestionApi: {
          search: () => Promise.resolve({ suggestions: ["sugg1", "sugg2"] }),
        },
        initialQueryState: {
          queryString: "",
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(updateSuggestions("test suggestion"));

      expect(store.getState().query.suggestionString).toBe("test suggestion");
    });
  });

  describe("updateQueryStateFromUrl", () => {
    it("should update query state from urlHandlerApi when urlHandlerApi exists", async () => {
      class UrlHandler {
        get() {
          return {
            queryString: "urltext",
            page: 3,
            sortBy: "bestmatch",
            sortOrder: "asc",
          };
        }
        replace() {}
      }

      const urlHandler = new UrlHandler();
      const replaceSpy = jest.spyOn(urlHandler, "replace");

      const config = {
        urlHandlerApi: urlHandler,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          queryString: "",
          page: 1,
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(updateQueryStateFromUrl());

      expect(store.getState().query.queryString).toBe("urltext");
      expect(store.getState().query.page).toBe(3);

      replaceSpy.mockRestore();
    });

    it("should not update when urlHandlerApi is null", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          queryString: "",
          page: 1,
        },
      };
      const store = createStoreWithConfig(config);
      const queryBefore = store.getState().query;

      await store.dispatch(updateQueryStateFromUrl());

      expect(store.getState().query).toEqual(queryBefore);
    });
  });

  describe("onAppInitialized", () => {
    it("should executeQuery when searchOnInit is true", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        searchOnInit: true,
        initialQueryState: {
          queryString: "",
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(onAppInitialized(true));

      // Check that loading was set during execution
      expect(store.getState().results.loading).toBe(false);
    });

    it("should not executeQuery when searchOnInit is false", async () => {
      const config = {
        urlHandlerApi: null,
        searchApi: {
          search: () => RESULTS,
        },
        initialQueryState: {
          queryString: "",
        },
      };
      const store = createStoreWithConfig(config);

      await store.dispatch(onAppInitialized(false));

      // Results should not be loaded
    });
  });
});
