/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import MockAdapter from "axios-mock-adapter";
import Qs from "qs";
import { ESSearchApi } from ".";

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

describe("test ESSearchApi class", () => {
  it("should use the provided configuration", async () => {
    const searchApi = new ESSearchApi({
      axios: {
        url: "https://mydomain.test.com/api/",
        timeout: 5000,
        headers: { Accept: "application/json" },
      },
      es: {
        requestSerializer: MockedRequestSerializer,
        responseSerializer: MockedResponseSerializer,
      },
    });
    const mockedAxios = new MockAdapter(searchApi.http);

    const requestPayload = { q: "test" };
    const mockedRequestSerializer = new MockedRequestSerializer();
    expect(searchApi.requestSerializer).toEqual(mockedRequestSerializer);
    expect(searchApi.responseSerializer).toEqual(new MockedResponseSerializer());

    const mockedResponse = { hits: [{ result: "1" }] };
    mockedAxios.onAny().reply(200, mockedResponse);
    const response = await searchApi.search(requestPayload);
    expect(mockedAxios.history.post.length).toBe(1);

    const request = mockedAxios.history.post[0];
    expect(request.url).toBe("https://mydomain.test.com/api/");
    expect(request.method).toBe("post");
    expect(request.timeout).toBe(5000);
    expect(request.data).toEqual("q=test");

    expect(response).toEqual(mockedResponse);
  });

  it("should properly use relative URLs", async () => {
    const searchApi = new ESSearchApi({
      axios: {
        url: "/api/records",
      },
      es: {
        requestSerializer: MockedRequestSerializer,
        responseSerializer: MockedResponseSerializer,
      },
    });
    const mockedAxios = new MockAdapter(searchApi.http);

    const mockedResponse = { hits: [{ result: "1" }] };
    mockedAxios.onAny().reply(200, mockedResponse);
    await searchApi.search({ q: "test" });
    expect(mockedAxios.history.post.length).toBe(1);

    const request = mockedAxios.history.post[0];
    expect(request.url).toBe("/api/records");
  });
});
