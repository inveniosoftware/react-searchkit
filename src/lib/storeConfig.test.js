import {
  INITIAL_QUERY_STATE,
  INITIAL_QUERY_STATE_KEYS,
  INITIAL_RESULTS_STATE,
  INITIAL_APP_STATE,
} from "./storeConfig";

describe("storeConfig", () => {
  test("exports initial state constants", () => {
    expect(INITIAL_QUERY_STATE).toBeDefined();
    expect(INITIAL_QUERY_STATE_KEYS).toBeDefined();
    expect(INITIAL_RESULTS_STATE).toBeDefined();
    expect(INITIAL_APP_STATE).toBeDefined();
  });

  test("INITIAL_QUERY_STATE_KEYS matches INITIAL_QUERY_STATE keys", () => {
    expect(INITIAL_QUERY_STATE_KEYS).toEqual(Object.keys(INITIAL_QUERY_STATE));
  });
});
