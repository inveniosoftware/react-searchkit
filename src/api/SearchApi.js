import axios from 'axios';

export class SearchApi {
  filter(terms, searchOnFilter = true) {
    if (searchOnFilter) {
      this._execute();
    }
  }

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
    let { currentQueryString, filters, sorting, pagination } = query;
    let params = this._processParams(
      currentQueryString,
      filters,
      sorting,
      pagination
    );

    apiConfig['params'] = { ...apiConfig['params'], ...params };
    return axios(apiConfig);
  }
}

const query = {
  currentQueryString: 'The current query the user selected',
  filters: {
    checkboxFilter: ['videos'],
  },
  sorting: 'Mostrecent',
  pagination: {
    page: 1,
    size: 10,
  },
};
