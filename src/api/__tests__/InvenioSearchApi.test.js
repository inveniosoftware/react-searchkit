/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import MockAdapter from 'axios-mock-adapter';
import Qs from 'qs';
import { InvenioSearchApi } from '@app/api';

describe('test Invenio search api class', () => {
  it('should use passed configuration', async () => {
    const mockedRequestSerializer = {
      serialize: params => Qs.stringify(params),
    };
    const mockedResponseSerializer = { serialize: payload => payload };

    const searchApi = new InvenioSearchApi({
      url: 'https://mydomain.test.com/api/',
      timeout: 5000,
      headers: { Accept: 'application/json' },
      requestSerializer: mockedRequestSerializer,
      responseSerializer: mockedResponseSerializer,
    });
    const mockedAxios = new MockAdapter(searchApi.http);

    const requestPayload = { q: 'test' };
    expect(searchApi.responseSerializer).toEqual(mockedResponseSerializer);

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
