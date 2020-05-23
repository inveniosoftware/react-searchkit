/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { shallow } from 'enzyme';
import React from 'react';
import { UrlHandlerApi } from '../../api';
import { createStoreWithConfig } from '../../store';
import { ReactSearchKit } from './ReactSearchKit';

jest.mock('../Bootstrap', () => {
  return {
    Bootstrap: () => {},
  };
});

jest.mock('../../store', () => ({
  createStoreWithConfig: jest.fn(),
}));

jest.mock('../../api');

beforeEach(() => {
  UrlHandlerApi.mockClear();
});

const searchApi = new (class {})();

const initialQueryState = {};

describe('test ReactSearchKit component', () => {
  it('should use default configuration', () => {
    shallow(<ReactSearchKit searchApi={searchApi} />);

    expect(createStoreWithConfig).toBeCalledWith(
      expect.objectContaining({
        searchApi: searchApi,
        urlHandlerApi: UrlHandlerApi.mock.instances[0],
      })
    );
    expect(UrlHandlerApi.mock.calls[0]).toMatchObject({});
  });

  it('should use disable UrlHandlerApi when enabled value if false', () => {
    shallow(
      <ReactSearchKit
        searchApi={searchApi}
        urlHandlerApi={{ enabled: false }}
      />
    );

    expect(createStoreWithConfig).toBeCalledWith(
      expect.objectContaining({
        searchApi: searchApi,
        urlHandlerApi: null,
      })
    );

    shallow(
      <ReactSearchKit
        searchApi={searchApi}
        urlHandlerApi={{ enabled: false, customHandler: new (class {})() }}
      />
    );

    expect(createStoreWithConfig).toBeCalledWith(
      expect.objectContaining({
        searchApi: searchApi,
        urlHandlerApi: null,
      })
    );
  });

  it('should use inject extra config to UrlHandlerApi', () => {
    shallow(
      <ReactSearchKit
        searchApi={searchApi}
        urlHandlerApi={{
          enabled: true,
          overrideConfig: {
            some: 'value',
          },
        }}
      />
    );

    expect(createStoreWithConfig).toBeCalledWith(
      expect.objectContaining({
        searchApi: searchApi,
        urlHandlerApi: UrlHandlerApi.mock.instances[0],
      })
    );
    expect(UrlHandlerApi.mock.calls[0][0]).toMatchObject({
      some: 'value',
    });
  });

  it('should use inject initialQueryState in the configuration', () => {
    shallow(
      <ReactSearchKit
        searchApi={searchApi}
        initialQueryState={initialQueryState}
      />
    );

    expect(createStoreWithConfig).toBeCalledWith(
      expect.objectContaining({
        searchApi: searchApi,
        initialQueryState: initialQueryState,
      })
    );
  });

  it('should use custom class for UrlHandlerApi when provided', () => {
    const mockedCustomUrlHandlerApi = new (class {})();
    shallow(
      <ReactSearchKit
        searchApi={searchApi}
        urlHandlerApi={{
          enabled: true,
          customHandler: mockedCustomUrlHandlerApi,
        }}
      />
    );

    expect(createStoreWithConfig).toBeCalledWith(
      expect.objectContaining({
        searchApi: searchApi,
        urlHandlerApi: mockedCustomUrlHandlerApi,
      })
    );
  });

  it('should use layout options in the initialQueryState', () => {
    shallow(
      <ReactSearchKit
        searchApi={searchApi}
        initialQueryState={{
          layout: 'grid',
        }}
      />
    );

    expect(createStoreWithConfig).toBeCalledWith(
      expect.objectContaining({
        searchApi: searchApi,
        initialQueryState: { layout: 'grid' },
      })
    );
  });

  it('should inject configuration to Bootstrap when provided', () => {
    const rsk = shallow(
      <ReactSearchKit
        searchApi={searchApi}
        searchOnInit={false}
        appName={'myApp'}
      />
    );
    const bootstrapComponent = rsk.childAt(0).childAt(0);
    expect(bootstrapComponent.prop('searchOnInit')).toBe(false);
    expect(bootstrapComponent.prop('eventListenerEnabled')).toBe(false);
  });
});
