import { updateQueryAggregation } from './query';

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

describe('user selects first level aggregation', () => {
  test('`type: Publication` should be added when no another `type` are selected', () => {
    const state = [{ file_type: { value: 'pdf' } }];
    const query = { type: { value: 'Publication' } };

    const newState = updateQueryAggregation(query, state);
    expect(newState).toEqual([
      { file_type: { value: 'pdf' } },
      { type: { value: 'Publication' } },
    ]);
  });

  test('`type: Publication` should be added when another `type` is already selected', () => {
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
});

describe('user selects second level aggregation', () => {
  test('`subtype: Other` should be added when user selects it', () => {
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

  test('all `subtype` should be removed when user selects the parent `type: Publication`', () => {
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
  test('parent `type: Publication` should be cleared when user selects  `subtype: Other`', () => {
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
});

describe('user selects third level aggregation', () => {
  test('`subsubtype: Public reports` should be added when user selects it', () => {
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

  test('all `subsubtype` should be removed when user selects the parent `subtype: Report`', () => {
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
