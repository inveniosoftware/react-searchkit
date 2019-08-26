/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import MockAdapter from 'axios-mock-adapter';
import Qs from 'qs';
import { InvenioSearchApi } from '../';

class MockedRequestSerializer {
  serialize(params) {
    return Qs.stringify(params);
  }
}

class MockedResponseSerializer {
  serialize(payload) {
    return payload;
  }
}

describe('test Invenio search api class', () => {
  it('should use passed configuration', async () => {
    const searchApi = new InvenioSearchApi({
      url: 'https://mydomain.test.com/api/',
      timeout: 5000,
      headers: { Accept: 'application/json' },
      invenio: {
        requestSerializer: MockedRequestSerializer,
        responseSerializer: MockedResponseSerializer,
      },
    });
    const mockedAxios = new MockAdapter(searchApi.http);

    const requestPayload = { q: 'test' };
    const mockedRequestSerializer = new MockedRequestSerializer();
    expect(searchApi.requestSerializer).toEqual(mockedRequestSerializer);
    expect(searchApi.responseSerializer).toEqual(
      new MockedResponseSerializer()
    );

    const mockedResponse = { hits: [{ result: '1' }] };
    mockedAxios.onAny().reply(200, mockedResponse);
    const response = await searchApi.search(requestPayload);
    expect(mockedAxios.history.get.length).toBe(1);

    const request = mockedAxios.history.get[0];
    expect(request.baseURL).toBe('https://mydomain.test.com/api/');
    expect(request.method).toBe('get');
    expect(request.timeout).toBe(5000);
    expect(request.headers).toEqual({ Accept: 'application/json' });
    expect(request.params).toEqual(requestPayload);
    expect(request.paramsSerializer).toBe(mockedRequestSerializer.serialize);

    expect(response).toEqual(mockedResponse);
  });
});
