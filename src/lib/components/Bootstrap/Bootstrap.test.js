/*
 * SPDX-FileCopyrightText: 2019-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { mount } from "enzyme";
import React from "react";
import { onQueryChanged } from "../../events";
import { AppContext } from "../ReactSearchKit/AppContext";
import Bootstrap from "./Bootstrap";

describe("test Bootstrap component", () => {
  it("should call updateQueryState func when a valid event is sent", () => {
    const mockUpdateQueryState = jest.fn();
    mount(
      <AppContext.Provider value={{ appName: "MyRSK" }}>
        <Bootstrap
          searchOnInit={false}
          eventListenerEnabled
          onAppInitialized={jest.fn()}
          updateQueryState={mockUpdateQueryState}
          searchOnUrlQueryStringChanged={() => {}}
        >
          <div />
        </Bootstrap>
      </AppContext.Provider>
    );
    const expectedPayload = {
      searchQuery: { queryString: "test" },
      appName: "MyRSK",
    };
    onQueryChanged(expectedPayload);
    expect(mockUpdateQueryState).toHaveBeenCalledWith(expectedPayload.searchQuery);
  });

  it("should not call updateQueryState func when an invalid event is sent", () => {
    const mockUpdateQueryState = jest.fn();
    mount(
      <AppContext.Provider value={{ appName: "MyRSK" }}>
        <Bootstrap
          searchOnInit={false}
          eventListenerEnabled={false}
          onAppInitialized={jest.fn()}
          updateQueryState={mockUpdateQueryState}
          searchOnUrlQueryStringChanged={() => {}}
        >
          <div />
        </Bootstrap>
      </AppContext.Provider>
    );
    onQueryChanged({});
    expect(mockUpdateQueryState).not.toHaveBeenCalled();
  });

  it("should not call updateQueryState func when the appName in the event does not match", () => {
    const mockUpdateQueryState = jest.fn();
    mount(
      <AppContext.Provider value={{ appName: "MyRSK" }}>
        <Bootstrap
          searchOnInit={false}
          appName="MyRSK"
          eventListenerEnabled
          onAppInitialized={jest.fn()}
          updateQueryState={mockUpdateQueryState}
          searchOnUrlQueryStringChanged={() => {}}
        >
          <div />
        </Bootstrap>
      </AppContext.Provider>
    );

    const expectedPayload = {
      appName: "unknown_app",
      searchQuery: { queryString: "test" },
    };

    onQueryChanged(expectedPayload);
    expect(mockUpdateQueryState).not.toHaveBeenCalled();
  });
});
