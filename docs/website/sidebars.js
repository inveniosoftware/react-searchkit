/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

module.exports = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Guide',
      items: [
        'getting-started',
        'main-concepts',
        'connect-your-rest-apis',
        'using-url-parameters',
        'filters-aggregations',
        'ui-customisation',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/react-searchkit',
        'components/active-filters',
        'components/bucket-aggregation',
        'components/range-facet',
        'components/count',
        'components/empty-results',
        'components/error',
        'components/layout-switcher',
        'components/pagination',
        'components/results-grid',
        'components/results-list',
        'components/results-loader',
        'components/results-multi-layout',
        'components/results-per-page',
        'components/search-bar',
        'components/sort',
        'components/sort-by',
        'components/sort-order',
        'components/toggle',
        'components/with-state',
      ],
    },
    {
      type: 'category',
      label: 'Extending',
      items: ['create-your-component'],
    },
  ],
};
