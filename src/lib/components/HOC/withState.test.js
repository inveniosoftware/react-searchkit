/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { withState } from './withState';

const mockStore = configureMockStore();

describe('withState tests', () => {
  let WithStateComponent;
  let store;
  beforeEach(() => {
    store = mockStore({});
    store.clearActions();
    const mockedComponent = jest.fn();
    WithStateComponent = withState(mockedComponent);
  });

  it('should find the props exposed by withState', async () => {
    const wrapper = shallow(<WithStateComponent store={store} />);
    const props = wrapper.children(0).props();
    expect(props.hasOwnProperty('currentResultsState')).toBe(true);
    expect(props.hasOwnProperty('currentQueryState')).toBe(true);
    expect(props.hasOwnProperty('updateQueryState')).toBe(true);
  });
});
