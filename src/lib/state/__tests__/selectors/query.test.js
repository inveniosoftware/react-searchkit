/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { updateQueryAggregation } from '../../selectors/query';

/**
 * Test scenario
 *
 * File Types [file_type]
 *  - png
 *  - pdf
 * Data Types [type]
 *  - Publication [subtype]
 *    - Article
 *    - Report [subsubtype]
 *      - Restricted reports
 *      - Public reports
 *    - Other
 *  - Image [subtype]
 *    - Figure
 *    - Drawing
 *    - Other
 *  - Software
 */

describe('queries with first level aggregations.', () => {
  test('query with `type: Publication` should be added when not in the state.', () => {
    const state = [{ file_type: { value: 'pdf' } }];
    const query = { type: { value: 'Publication' } };

    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([
      { file_type: { value: 'pdf' } },
      { type: { value: 'Publication' } },
    ]);
  });

  test('query with `type: Publication` should be added when another `type` is already in the state.', () => {
    const state = [
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
    ];
    const query = { type: { value: 'Publication' } };

    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      { type: { value: 'Publication' } },
    ]);
  });

  test('query with `type: Image` should remove it from the state when it is already there.', () => {
    const state = [
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      { type: { value: 'Publication' } },
    ];
    const query = { type: { value: 'Image' } };

    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([
      { file_type: { value: 'pdf' } },
      { type: { value: 'Publication' } },
    ]);
  });
});

describe('queries with second level aggregations.', () => {
  test('query with `subtype: Other` should be added when not in the state.', () => {
    const state = [
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
    ];
    const query = {
      type: { value: 'Publication', subtype: { value: 'Other' } },
    };

    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      { type: { value: 'Publication', subtype: { value: 'Other' } } },
    ]);
  });

  test('query with `type` should remove from the state any children query.', () => {
    const state = [
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      { type: { value: 'Publication', subtype: { value: 'Other' } } },
      { type: { value: 'Publication', subtype: { value: 'Report' } } },
      { type: { value: 'Publication', subtype: { value: 'Article' } } },
    ];
    const query = {
      type: { value: 'Publication' },
    };

    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      { type: { value: 'Publication' } },
    ]);
  });

  test('query with `subtype: Other` should remove any query with the parent `type: Publication`.', () => {
    const state = [
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      { type: { value: 'Publication' } },
    ];
    const query = {
      type: { value: 'Publication', subtype: { value: 'Other' } },
    };

    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      { type: { value: 'Publication', subtype: { value: 'Other' } } },
    ]);
  });

  test('query with `subtype: Other` should remove it from the state when it is already there.', () => {
    const state = [
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      { type: { value: 'Publication', subtype: { value: 'Other' } } },
    ];
    const query = {
      type: { value: 'Publication', subtype: { value: 'Other' } },
    };

    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
    ]);
  });
});

describe('queries with third level aggregations.', () => {
  test('query with `subsubtype: Public reports` should be added when not in the state.', () => {
    const state = [
      { file_type: { value: 'png' } },
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      { type: { value: 'Publication', subtype: { value: 'Article' } } },
    ];
    const query = {
      type: {
        value: 'Publication',
        subtype: { value: 'Report', subsubtype: { value: 'Public reports' } },
      },
    };

    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([
      { file_type: { value: 'png' } },
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      { type: { value: 'Publication', subtype: { value: 'Article' } } },
      {
        type: {
          value: 'Publication',
          subtype: {
            value: 'Report',
            subsubtype: { value: 'Public reports' },
          },
        },
      },
    ]);
  });

  test('query with `subtype: Report` should remove from the state any child query with `subsubtype`', () => {
    const state = [
      { file_type: { value: 'png' } },
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      {
        type: {
          value: 'Publication',
          subtype: { value: 'Report', subsubtype: { value: 'Restricted' } },
        },
      },
      {
        type: {
          value: 'Publication',
          subtype: { value: 'Report', subsubtype: { value: 'Public' } },
        },
      },
    ];
    const query = {
      type: {
        value: 'Publication',
        subtype: { value: 'Report' },
      },
    };

    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([
      { file_type: { value: 'png' } },
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      { type: { value: 'Publication', subtype: { value: 'Report' } } },
    ]);
  });

  test('query with `type: Publication` should remove from the state any child query with `subtype` or `subsubtype`', () => {
    const state = [
      { file_type: { value: 'png' } },
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      {
        type: {
          value: 'Publication',
          subtype: { value: 'Report', subsubtype: { value: 'Restricted' } },
        },
      },
    ];
    const query = {
      type: {
        value: 'Publication',
      },
    };

    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([
      { file_type: { value: 'png' } },
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      { type: { value: 'Publication' } },
    ]);
  });

  test('query with `subsubtype: Report` should remove it from the state when it is already there.', () => {
    const state = [
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
      {
        type: {
          value: 'Publication',
          subtype: { value: 'Report', subsubtype: { value: 'Public reports' } },
        },
      },
    ];
    const query = {
      type: {
        value: 'Publication',
        subtype: { value: 'Report', subsubtype: { value: 'Public reports' } },
      },
    };

    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([
      { file_type: { value: 'pdf' } },
      { type: { value: 'Image' } },
    ]);
  });
});

describe('user clears previous selections', () => {
  const state = [
    { type: { value: 'Publication', subtype: { value: 'Article' } } },
    {
      type: {
        value: 'Publication',
        subtype: { value: 'Report', subsubtype: { value: 'Public' } },
      },
    },
    { type: { value: 'Image' } },
    { file_type: { value: 'pdf' } },
  ];

  test('`type` selections are removed when user unselects it', () => {
    const query = { type: { value: '' } };
    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([{ file_type: { value: 'pdf' } }]);
  });
});
