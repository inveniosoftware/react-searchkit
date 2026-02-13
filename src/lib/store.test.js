import { createStoreWithConfig } from "./store";
import { INITIAL_QUERY_STATE, INITIAL_RESULTS_STATE } from "./storeConfig";

describe("Redux store", () => {
  const createConfig = (overrides = {}) => ({
    searchOnInit: false,
    initialQueryState: {},
    ...overrides,
  });

  test("creates store with merged initial state from config and defaults", () => {
    const config = createConfig({
      initialQueryState: { queryString: "test", sortBy: "title" },
    });

    const store = createStoreWithConfig(config);
    const query = store.getState().query;

    // Config overrides defaults; non-overridden values match INITIAL_QUERY_STATE
    expect(query.queryString).toBe("test");
    expect(query.sortBy).toBe("title");
    const { queryString: _qs, sortBy: _sb, ...nonOverridden } = INITIAL_QUERY_STATE;
    expect(query).toMatchObject(nonOverridden);
  });

  test("applies URL params when urlHandlerApi is provided", () => {
    const config = createConfig({
      urlHandlerApi: {
        get: (state) => ({ ...state, queryString: "from-url" }),
      },
      initialQueryState: { queryString: "initial" },
    });

    const store = createStoreWithConfig(config);

    expect(store.getState().query.queryString).toBe("from-url");
  });

  test("sets loading state based on searchOnInit config", () => {
    const store = createStoreWithConfig(createConfig({ searchOnInit: true }));

    const results = store.getState().results;
    expect(results.loading).toBe(true);
    const { loading: _loading, ...nonOverridden } = INITIAL_RESULTS_STATE;
    expect(results).toMatchObject(nonOverridden);
  });

  test("detects when user changed sorting from initial values", () => {
    const urlHandler = {
      get: () => ({ sortBy: "custom", sortOrder: "desc" }),
    };
    const config = createConfig({
      urlHandlerApi: urlHandler,
      initialQueryState: { sortBy: "default", sortOrder: "asc" },
      defaultSortingOnEmptyQueryString: { sortBy: "relevance", sortOrder: "asc" },
    });

    const store = createStoreWithConfig(config);

    // hasUserChangedSorting is true when URL sorting differs from BOTH initial AND defaultOnEmpty
    expect(store.getState().app.hasUserChangedSorting).toBe(true);
    expect(store.getState().app.initialSortBy).toBe("default");
  });

  test("detects unchanged sorting when URL matches initial values", () => {
    const urlHandler = {
      get: () => ({ sortBy: "default", sortOrder: "asc" }),
    };
    const config = createConfig({
      urlHandlerApi: urlHandler,
      initialQueryState: { sortBy: "default", sortOrder: "asc" },
    });

    const store = createStoreWithConfig(config);

    expect(store.getState().app.hasUserChangedSorting).toBe(false);
  });

  test("considers defaultSortingOnEmptyQueryString when detecting changes", () => {
    const urlHandler = {
      get: () => ({ sortBy: "date", sortOrder: "desc" }),
    };
    const config = createConfig({
      urlHandlerApi: urlHandler,
      initialQueryState: { sortBy: "relevance", sortOrder: "asc" },
      defaultSortingOnEmptyQueryString: {
        sortBy: "date",
        sortOrder: "desc",
      },
    });

    const store = createStoreWithConfig(config);

    expect(store.getState().app.hasUserChangedSorting).toBe(false);
  });
});
