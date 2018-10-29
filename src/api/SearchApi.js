import axios from 'axios';

export class SearchApi {
  _addFilterToParams(params, filters) {
    let newParams = { ...params };
    Object.keys(filters).forEach(key => {
      newParams[key] = filters[key];
    });
    return newParams;
  }

  _processParams(queryString, filters, sortBy, sortOrder, page, size) {
    let params = {};
    params['q'] = queryString;
    if (filters) {
      params = this._addFilterToParams(params, filters);
    }

    params['sortBy'] = sortBy;
    params['sortOrder'] = sortOrder;
    params['page'] = page;
    params['size'] = size;

    return params;
  }

  search(query, apiConfig) {
    let { queryString, filters, sortBy, sortOrder, page, size } = query;
    let params = this._processParams(
      queryString,
      filters,
      sortBy,
      sortOrder,
      page,
      size
    );

    apiConfig['params'] = { ...apiConfig['params'], ...params };
    return axios(apiConfig);
  }

  serialize(response) {
    let data = {};

    data['filters'] = response.aggregations || {};
    data['hits'] = response.hits.hits;
    data['total'] = response.hits.total;
    return data;
  }
}

const query = {
  currentQueryString: 'The current query the user selected',
  filters: {
    categories: ['publications', 'videos'],
    types: [],
  },
  sorting: {
    by: 'most-recent',
    order: 'asc',
  },
  pagination: {
    page: 1,
    size: 10,
  },
};
