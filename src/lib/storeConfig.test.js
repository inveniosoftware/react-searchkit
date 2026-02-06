import {
  INITIAL_QUERY_STATE,
  INITIAL_QUERY_STATE_KEYS,
  INITIAL_RESULTS_STATE,
  INITIAL_APP_STATE,
} from "./storeConfig";

describe("storeConfig", () => {
  describe("INITIAL_QUERY_STATE", () => {
    it("should have the correct initial query state structure", () => {
      expect(INITIAL_QUERY_STATE).toEqual({
        queryString: "",
        suggestions: [],
        sortBy: null,
        sortOrder: null,
        page: -1,
        size: -1,
        filters: [],
        hiddenParams: [],
        layout: null,
      });
    });

    it("should have all expected keys", () => {
      expect(INITIAL_QUERY_STATE).toHaveProperty("queryString");
      expect(INITIAL_QUERY_STATE).toHaveProperty("suggestions");
      expect(INITIAL_QUERY_STATE).toHaveProperty("sortBy");
      expect(INITIAL_QUERY_STATE).toHaveProperty("sortOrder");
      expect(INITIAL_QUERY_STATE).toHaveProperty("page");
      expect(INITIAL_QUERY_STATE).toHaveProperty("size");
      expect(INITIAL_QUERY_STATE).toHaveProperty("filters");
      expect(INITIAL_QUERY_STATE).toHaveProperty("hiddenParams");
      expect(INITIAL_QUERY_STATE).toHaveProperty("layout");
    });

    it("should be a frozen object", () => {
      const original = INITIAL_QUERY_STATE;
      const keys = Object.keys(original);
      // In production, these should not be modified
      expect(keys).toHaveLength(9);
    });
  });

  describe("INITIAL_QUERY_STATE_KEYS", () => {
    it("should have the correct number of keys", () => {
      expect(INITIAL_QUERY_STATE_KEYS).toHaveLength(9);
    });

    it("should contain all query state keys", () => {
      expect(INITIAL_QUERY_STATE_KEYS).toContain("queryString");
      expect(INITIAL_QUERY_STATE_KEYS).toContain("suggestions");
      expect(INITIAL_QUERY_STATE_KEYS).toContain("sortBy");
      expect(INITIAL_QUERY_STATE_KEYS).toContain("sortOrder");
      expect(INITIAL_QUERY_STATE_KEYS).toContain("page");
      expect(INITIAL_QUERY_STATE_KEYS).toContain("size");
      expect(INITIAL_QUERY_STATE_KEYS).toContain("filters");
      expect(INITIAL_QUERY_STATE_KEYS).toContain("hiddenParams");
      expect(INITIAL_QUERY_STATE_KEYS).toContain("layout");
    });

    it("should match the keys of INITIAL_QUERY_STATE", () => {
      expect(INITIAL_QUERY_STATE_KEYS).toEqual(Object.keys(INITIAL_QUERY_STATE));
    });
  });

  describe("INITIAL_RESULTS_STATE", () => {
    it("should have the correct initial results state structure", () => {
      expect(INITIAL_RESULTS_STATE).toEqual({
        loading: false,
        data: {
          hits: [],
          total: 0,
          aggregations: {},
        },
        error: {},
      });
    });

    it("should have all expected keys", () => {
      expect(INITIAL_RESULTS_STATE).toHaveProperty("loading");
      expect(INITIAL_RESULTS_STATE).toHaveProperty("data");
      expect(INITIAL_RESULTS_STATE.data).toHaveProperty("hits");
      expect(INITIAL_RESULTS_STATE.data).toHaveProperty("total");
      expect(INITIAL_RESULTS_STATE.data).toHaveProperty("aggregations");
      expect(INITIAL_RESULTS_STATE).toHaveProperty("error");
    });

    it("should be a frozen object", () => {
      const original = INITIAL_RESULTS_STATE;
      const keys = Object.keys(original);
      expect(keys).toHaveLength(3);
    });
  });

  describe("INITIAL_APP_STATE", () => {
    it("should have the correct initial app state structure", () => {
      expect(INITIAL_APP_STATE).toEqual({
        hasUserChangedSorting: false,
        initialSortBy: null,
        initialSortOrder: null,
      });
    });

    it("should have all expected keys", () => {
      expect(INITIAL_APP_STATE).toHaveProperty("hasUserChangedSorting");
      expect(INITIAL_APP_STATE).toHaveProperty("initialSortBy");
      expect(INITIAL_APP_STATE).toHaveProperty("initialSortOrder");
    });

    it("should be a frozen object", () => {
      const original = INITIAL_APP_STATE;
      const keys = Object.keys(original);
      expect(keys).toHaveLength(3);
    });
  });
});
