/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  executeQuery,
  onAppInitialized,
  setInitialState,
  updateQuerySortBy,
  updateQuerySortOrder,
  updateQueryString,
} from '.';
import { createStoreWithConfig } from '../../store';
import {
  RESULTS_FETCH_SUCCESS,
  RESULTS_LOADING,
  SET_QUERY_COMPONENT_INITIAL_STATE,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
  SET_QUERY_STRING,
} from '../types';

const urlHandlerApiSet = jest.fn();
const urlHandlerApiReplace = jest.fn();
class FakeUrlHandlerApi {
  get(queryState) {
    return queryState;
  }
  set(params) {
    return urlHandlerApiSet(params);
  }
  replace(params) {
    return urlHandlerApiReplace(params);
  }
}

let store;
afterEach(() => {
  store.clearActions();
  urlHandlerApiSet.mockClear();
  urlHandlerApiReplace.mockClear();
});

describe('test query actions to update query state', () => {
  const config = {
    urlHandlerApi: null,
    searchApi: {
      search: (query) => ({
        aggregations: [],
        hits: [],
        total: 0,
      }),
    },
  };
  const middlewares = [thunk.withExtraArgument(config)];
  const mockStore = configureMockStore(middlewares);

  const initialState = {
    queryString: '',
    sortBy: null,
    sortOrder: null,
    page: null,
    size: null,
    aggregations: [],
    layout: null,
  };
  beforeEach(() => {
    store = mockStore({
      query: initialState,
    });
  });

  it('fires a set initial state action', async () => {
    const initialState = { queryString: 'this is my message' };
    const expectedActions = [
      {
        type: SET_QUERY_COMPONENT_INITIAL_STATE,
        payload: initialState,
      },
    ];

    await store.dispatch(setInitialState(initialState));
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });

  it('executes a search after app init', async () => {
    const expectedActions = [
      {
        type: RESULTS_LOADING,
      },
      {
        type: RESULTS_FETCH_SUCCESS,
      },
    ];

    await store.dispatch(onAppInitialized(true));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(expectedActions[0].type);
    expect(actions[1].type).toEqual(expectedActions[1].type);
  });

  it('updates the query state with a new query string', async () => {
    const newQueryString = 'this is my message';
    const expectedActions = [
      {
        type: SET_QUERY_STRING,
        payload: newQueryString,
      },
    ];

    await store.dispatch(updateQueryString(newQueryString));
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });

  it('updates the query state with a new sortBy value', async () => {
    const newSortBy = 'mostrecent';
    const expectedActions = [
      {
        type: SET_QUERY_SORT_BY,
        payload: newSortBy,
      },
    ];

    await store.dispatch(updateQuerySortBy(newSortBy));
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });

  it('updates the query state with a new sortOrder value', async () => {
    const newSortOrder = 'desc';
    const expectedActions = [
      {
        type: SET_QUERY_SORT_ORDER,
        payload: newSortOrder,
      },
    ];

    await store.dispatch(updateQuerySortOrder(newSortOrder));
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });
});

describe('test query actions to execute search', () => {
  it('successfully execute search and update result state with no URL update', async () => {
    const RESULTS = {
      aggregations: [],
      hits: [],
      total: 1,
    };
    const configNoURLhandler = {
      urlHandlerApi: null,
      searchApi: {
        search: (query) => RESULTS,
      },
      initialQueryState: {},
    };
    const store = createStoreWithConfig(configNoURLhandler);
    const QUERY_STATE = {
      queryString: 'text',
    };
    store.getState().query = QUERY_STATE;

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    const queryState = store.getState().query;
    expect(queryState).toMatchObject(QUERY_STATE);
    const resultsState = store.getState().results;
    expect(resultsState).toMatchObject({
      data: RESULTS,
      error: {},
      loading: false,
    });
  });

  it('execute search and update result state with error', async () => {
    const configNoURLhandler = {
      urlHandlerApi: null,
      searchApi: {
        search: (query) => {
          throw Error('search error');
        },
      },
      initialQueryState: {},
    };
    const store = createStoreWithConfig(configNoURLhandler);
    const QUERY_STATE = {
      queryString: 'text',
    };
    store.getState().query = QUERY_STATE;

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    const queryState = store.getState().query;
    expect(queryState).toMatchObject(QUERY_STATE);
    const resultsState = store.getState().results;
    expect(resultsState).toMatchObject({
      data: {},
      error: Error('search error'),
      loading: false,
    });
  });
});

describe('test execute search with URL handler', () => {
  const configWithURLhandler = {
    urlHandlerApi: new FakeUrlHandlerApi(),
    searchApi: {
      search: (query) => ({
        aggregations: [],
        hits: [],
        total: 1,
      }),
    },
  };

  it('execute search and test that it should update URL params', async () => {
    const store = createStoreWithConfig(configWithURLhandler);
    store.getState().query.queryString = 'text';

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: true,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(urlHandlerApiSet).toHaveBeenCalled();
    expect(urlHandlerApiReplace).not.toHaveBeenCalled();
    const call = urlHandlerApiSet.mock.calls[0][0];
    expect(call.queryString).toEqual('text');
  });

  it('execute search and test that it should replace URL params', async () => {
    const store = createStoreWithConfig(configWithURLhandler);
    store.getState().query.queryString = 'another text';

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: true,
        shouldReplaceUrlQueryString: true,
      })
    );

    expect(urlHandlerApiReplace).toHaveBeenCalled();
    expect(urlHandlerApiSet).not.toHaveBeenCalled();
    const call = urlHandlerApiReplace.mock.calls[0][0];
    expect(call.queryString).toEqual('another text');

    urlHandlerApiReplace.mockClear();

    // test different combination of params
    store.getState().query.queryString = 'another text 2';

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: true,
      })
    );

    expect(urlHandlerApiReplace).toHaveBeenCalled();
    expect(urlHandlerApiSet).not.toHaveBeenCalled();
    const call2 = urlHandlerApiReplace.mock.calls[0][0];
    expect(call2.queryString).toEqual('another text 2');
  });
});

describe('test execute search sorting on empty query', () => {
  const configNoURLhandler = {
    urlHandlerApi: null,
    searchApi: {
      search: (query) => ({
        aggregations: [],
        hits: [],
        total: 1,
      }),
    },
    initialQueryState: {
      sortBy: 'bestmatch',
      sortOrder: 'desc',
    },
    defaultSortingOnEmptyQueryString: {
      sortBy: 'mostrecent',
      sortOrder: 'asc',
    },
  };

  it('execute search with default sorting when query not empty and user did not change sorting', async () => {
    const store = createStoreWithConfig(configNoURLhandler);
    store.getState().query.queryString = 'text';

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: 'text',
      sortBy: 'bestmatch',
      sortOrder: 'desc',
    });
  });

  it('execute search with defaultSortingOnEmptyQueryString when query empty and user did not change sorting', async () => {
    const store = createStoreWithConfig(configNoURLhandler);
    store.getState().query.queryString = '';

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: '',
      sortBy: 'mostrecent',
      sortOrder: 'asc',
    });
  });

  it('execute search with correct sorting depending on query string and when user did not change sorting', async () => {
    const store = createStoreWithConfig(configNoURLhandler);

    // 1: query string empty, use defaultSortingOnEmptyQueryString
    store.getState().query.queryString = '';

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: '',
      sortBy: 'mostrecent',
      sortOrder: 'asc',
    });

    // 2: user set query string, use default sorting
    store.getState().query.queryString = 'text';

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: 'text',
      sortBy: 'bestmatch',
      sortOrder: 'desc',
    });

    // 3: user cleaned empty string, use defaultSortingOnEmptyQueryString
    store.getState().query.queryString = '';

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: '',
      sortBy: 'mostrecent',
      sortOrder: 'asc',
    });
  });

  it('execute search with user selection sorting when query empty or not and user did change sorting', async () => {
    const store = createStoreWithConfig(configNoURLhandler);
    store.getState().app.hasUserChangedSorting = true;

    // 1: user changes sorting and set query string
    store.getState().query.queryString = 'text';
    store.getState().query.sortBy = 'mostpopular';
    store.getState().query.sortOrder = 'asc';
    store.getState().query._userHasChangedSorting = true; // must be set explicitly

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: 'text',
      sortBy: 'mostpopular',
      sortOrder: 'asc',
    });

    // 2: user changes sorting and cleaned query string
    store.getState().query.queryString = '';
    store.getState().query.sortBy = 'mostpopular';
    store.getState().query.sortOrder = 'asc';

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: '',
      sortBy: 'mostpopular',
      sortOrder: 'asc',
    });
  });
});

describe('test execute search and get new query state in response', () => {
  const configNoURLhandler = {
    urlHandlerApi: null,
    searchApi: {
      search: (query) => ({
        aggregations: [],
        hits: [],
        total: 1,
        newQueryState: {
          queryString: 'changed text',
          sortBy: 'anotherSortBy',
          sortOrder: 'anotherSortOrder',
          wrong: 'non-existing query state key',
        },
      }),
    },
    initialQueryState: {
      sortBy: 'bestmatch',
      sortOrder: 'desc',
    },
  };

  it('execute search and change query state when response contains a new query state', async () => {
    const store = createStoreWithConfig(configNoURLhandler);
    store.getState().query.queryString = 'text';

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    expect(store.getState().query).toMatchObject({
      queryString: 'changed text',
      sortBy: 'anotherSortBy',
      sortOrder: 'anotherSortOrder',
    });
  });

  it('execute search and change query state and URL params when response contains a new query state', async () => {
    const store = createStoreWithConfig({
      ...configNoURLhandler,
      urlHandlerApi: new FakeUrlHandlerApi(),
    });
    store.getState().query.queryString = 'text';

    await store.dispatch(
      executeQuery({
        shouldUpdateUrlQueryString: false,
        shouldReplaceUrlQueryString: false,
      })
    );

    const EXPECTED_QUERY_STATE = {
      queryString: 'changed text',
      sortBy: 'anotherSortBy',
      sortOrder: 'anotherSortOrder',
    };
    expect(store.getState().query).toMatchObject(EXPECTED_QUERY_STATE);

    const newQueryState = {
      ...store.getState().query,
      ...EXPECTED_QUERY_STATE,
    };
    expect(urlHandlerApiReplace).toHaveBeenCalledWith(newQueryState);
  });
});
