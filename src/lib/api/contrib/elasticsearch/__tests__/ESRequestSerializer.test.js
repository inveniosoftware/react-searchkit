/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { ESRequestSerializer } from '../';

describe('test ESRequestSerializer serializer', () => {
  const serializer = new ESRequestSerializer();

  it('should serialize the query field', () => {
    const queryState = {
      queryString: 'test',
      page: 0,
      size: 0,
    };
    const objState = serializer.serialize(queryState);
    expect(objState).toMatchObject({
      query: { query_string: { query: 'test' } },
    });
  });

  it('should serialize the sort by field', () => {
    const queryState = {
      queryString: 'test',
      sortBy: 'name',
      page: 0,
      size: 0,
    };
    const objState = serializer.serialize(queryState);
    expect(objState).toMatchObject({
      query: { query_string: { query: 'test' } },
      sort: { name: 'asc' },
    });
  });

  it('should serialize the sort order field with desc value', () => {
    const queryState = {
      queryString: 'test',
      sortBy: 'name',
      sortOrder: 'desc',
      page: 0,
      size: 0,
    };
    const objState = serializer.serialize(queryState);
    expect(objState).toMatchObject({
      query: { query_string: { query: 'test' } },
      sort: { name: 'desc' },
    });
  });

  it('should serialize the page field', () => {
    const queryState = {
      queryString: 'test',
      sortBy: 'name',
      page: 2,
      size: 0,
    };
    const objState = serializer.serialize(queryState);
    expect(objState).toMatchObject({
      query: { query_string: { query: 'test' } },
      sort: { name: 'asc' },
      from: 0,
    });
  });

  it('should serialize the size field', () => {
    const queryState = {
      queryString: 'test',
      sortBy: 'name',
      page: 2,
      size: 20,
    };
    const objState = serializer.serialize(queryState);
    expect(objState).toMatchObject({
      query: { query_string: { query: 'test' } },
      sort: { name: 'asc' },
      from: 20,
    });
  });
});
