import { onQueryChanged } from "./events";

describe("onQueryChanged", () => {
  beforeEach(() => {
    // Store original window.dispatchEvent
    window.originalDispatchEvent = window.dispatchEvent;
    // Mock window.dispatchEvent
    window.dispatchEvent = jest.fn();
  });

  afterEach(() => {
    // Restore original window.dispatchEvent
    window.dispatchEvent = window.originalDispatchEvent;
    delete window.originalDispatchEvent;
  });

  it("should dispatch a queryChanged event with the given payload", () => {
    const payload = { queryString: "test" };
    onQueryChanged(payload);

    expect(window.dispatchEvent).toHaveBeenCalledTimes(1);
    expect(window.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "queryChanged",
        detail: payload,
      })
    );
  });

  it("should dispatch event even with empty payload", () => {
    onQueryChanged({});

    expect(window.dispatchEvent).toHaveBeenCalledTimes(1);
    expect(window.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "queryChanged",
        detail: {},
      })
    );
  });

  it("should dispatch event with null payload", () => {
    onQueryChanged(null);

    expect(window.dispatchEvent).toHaveBeenCalledTimes(1);
    expect(window.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "queryChanged",
        detail: null,
      })
    );
  });

  it("should create a CustomEvent with proper structure", () => {
    const payload = { page: 1, size: 10 };
    onQueryChanged(payload);

    expect(window.dispatchEvent).toHaveBeenCalledWith(expect.any(CustomEvent));
    const eventCall = window.dispatchEvent.mock.calls[0][0];
    expect(eventCall.type).toBe("queryChanged");
    expect(eventCall.detail).toEqual(payload);
  });
});
