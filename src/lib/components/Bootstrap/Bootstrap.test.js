/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { mount } from 'enzyme';
import { default as Bootstrap } from './Bootstrap';
import { onQueryChanged } from '../../events';

describe('test Bootstrap component', () => {
  it('should update query state when event listener is registered', () => {
    const mockUpdateQueryState = jest.fn();
    mount(
      <Bootstrap
        searchOnInit={false}
        appName="RSK"
        eventListenerEnabled={true}
        onAppInitialized={jest.fn()}
        updateQueryState={mockUpdateQueryState}
      />
    );
    const expectedPayload = { searchQuery: { queryString: 'test' } };
    onQueryChanged(expectedPayload);
    expect(mockUpdateQueryState).toHaveBeenCalledWith(
      expectedPayload.searchQuery
    );
  });

  it('should not update query state when event listener is not registered', () => {
    const mockUpdateQueryState = jest.fn();
    mount(
      <Bootstrap
        searchOnInit={false}
        appName="RSK"
        eventListenerEnabled={false}
        onAppInitialized={jest.fn()}
        updateQueryState={mockUpdateQueryState}
      />
    );
    onQueryChanged({});
    expect(mockUpdateQueryState).not.toHaveBeenCalled();
  });

  it('should not update query state when event appName does not match ', () => {
    const mockUpdateQueryState = jest.fn();
    mount(
      <Bootstrap
        searchOnInit={false}
        appName="RSK"
        eventListenerEnabled={true}
        onAppInitialized={jest.fn()}
        updateQueryState={mockUpdateQueryState}
      />
    );
    const expectedPayload = {
      appName: 'unknown_app',
      searchQuery: { queryString: 'test' },
    };
    onQueryChanged(expectedPayload);
    expect(mockUpdateQueryState).not.toHaveBeenCalled();
  });
});
