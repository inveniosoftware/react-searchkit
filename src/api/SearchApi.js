import axios from 'axios';

export class SearchApi {
  _addFilterToParams(params, filters) {
    let newParams = { ...params };
    Object.keys(filters).forEach(key => {
      newParams[key] = filters[key];
    });
    return newParams;
  }

  _addSortingToParams(params, sorting) {
    let newParams = { ...params };
    Object.keys(sorting).forEach(key => {
      newParams[key] = sorting[key];
    });
    return newParams;
  }

  _addPaginationToParams(params, pagination) {
    let newParams = { ...params };
    Object.keys(pagination).forEach(key => {
      newParams[key] = pagination[key];
    });
    return newParams;
  }

  _processParams(queryString, filters, sorting, pagination) {
    let params = {};
    params['q'] = queryString;
    if (filters) {
      params = this._addFilterToParams(params, filters);
    }

    if (sorting) {
      params = this._addSortingToParams(params, sorting);
    }

    if (pagination) {
      params = this._addPaginationToParams(params, pagination);
    }
    return params;
  }

  search(query, apiConfig) {
    let { queryString, filters, sorting, pagination } = query;
    console.log(query);
    let params = this._processParams(queryString, filters, sorting, pagination);

    apiConfig['params'] = { ...apiConfig['params'], ...params };
    console.log(apiConfig);
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
