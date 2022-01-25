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

let urlHandlerApiGet = jest.fn();
let urlHandlerApiSet = jest.fn();
let urlHandlerApiReplace = jest.fn();
class FakeUrlHandlerApi {
  get(queryState) {
    return urlHandlerApiGet(queryState);
  }
  set(params) {
    return urlHandlerApiSet(params);
  }
  replace(params) {
    return urlHandlerApiReplace(params);
  }
}

beforeEach(() => {
  urlHandlerApiGet.mockImplementation((queryState) => queryState);
  urlHandlerApiSet.mockImplementation((params) => params);
  urlHandlerApiReplace.mockImplementation((params) => params);
});

let mockedStore;
afterEach(() => {
  mockedStore.clearActions();
  urlHandlerApiGet.mockClear();
  urlHandlerApiSet.mockClear();
  urlHandlerApiReplace.mockClear();
});

describe('test actions that update query state', () => {
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
  const storeMocker = configureMockStore(middlewares);

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
    mockedStore = storeMocker({
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

    await mockedStore.dispatch(setInitialState(initialState));
    const actions = mockedStore.getActions();
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

    await mockedStore.dispatch(onAppInitialized(true));
    const actions = mockedStore.getActions();

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

    await mockedStore.dispatch(updateQueryString(newQueryString));
    const actions = mockedStore.getActions();
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

    await mockedStore.dispatch(updateQuerySortBy(newSortBy));
    const actions = mockedStore.getActions();
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

    await mockedStore.dispatch(updateQuerySortOrder(newSortOrder));
    const actions = mockedStore.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });
});

describe('test action that executes a search', () => {
  it('should update the result state with the returned results', async () => {
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

  it('should update the result state with the returned error', async () => {
    const configNoURLhandler = {
      urlHandlerApi: null,
      searchApi: {
        search: (query) => {
          throw Error('Ignore this error! Error wanted to test error response');
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
      error: Error('Ignore this error! Error wanted to test error response'),
      loading: false,
    });
  });
});

describe('test execute search updating URL params', () => {
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

  it('should change URL params (adds history)', async () => {
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

  it('should replace URL params (replaces history)', async () => {
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

describe('test execute search changing sorting', () => {
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

  it('should use initial sorting when query string is not empty and user did not change sorting', async () => {
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

  it('should use defaultSortingOnEmptyQueryString sorting when query string is empty and user did not change sorting', async () => {
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

  it('should use sorting depending on query string value and when user did not change sorting', async () => {
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

  it('should use sorting selected by the user independently of the query string value', async () => {
    const store = createStoreWithConfig(configNoURLhandler);
    store.getState().app.hasUserChangedSorting = true;

    // 1: user changes sorting and set query string
    store.getState().query.queryString = 'text';
    store.getState().query.sortBy = 'mostpopular';
    store.getState().query.sortOrder = 'asc';

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

describe('execute search with specific sorting from URL params', () => {
  const configWithURLhandler = {
    urlHandlerApi: new FakeUrlHandlerApi(),
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

  it('should use the specific sorting from URL params on empty query string', async () => {
    // specific sorting from URL params
    urlHandlerApiGet = jest.fn();
    urlHandlerApiGet.mockImplementation((queryState) => ({
      ...queryState,
      sortBy: 'alphabetically',
      sortOrder: 'asc',
    }));

    const store = createStoreWithConfig(configWithURLhandler);

    store.getState().query.queryString = '';

    await store.dispatch(executeQuery());

    expect(store.getState().query).toMatchObject({
      queryString: '',
      sortBy: 'alphabetically',
      sortOrder: 'asc',
    });
  });

  it('should use the specific sorting from URL params on query string defined', async () => {
    // specific sorting from URL params
    urlHandlerApiGet = jest.fn();
    urlHandlerApiGet.mockImplementation((queryState) => ({
      ...queryState,
      sortBy: 'alphabetically',
      sortOrder: 'asc',
    }));

    const store = createStoreWithConfig(configWithURLhandler);

    store.getState().query.queryString = 'text';

    await store.dispatch(executeQuery());

    expect(store.getState().query).toMatchObject({
      queryString: 'text',
      sortBy: 'alphabetically',
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
