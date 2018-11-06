import 'babel-polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import {
  SET_QUERY_COMPONENT_INITIAL_STATE,
  SET_STATE_FROM_URL,
  SET_QUERY_STRING,
  SET_QUERY_SORT_BY,
  SET_QUERY_SORT_ORDER,
} from '@app/state/types';
import {
  setInitialState,
  setQueryFromUrl,
  updateQueryString,
  updateQuerySortBy,
  updateQuerySortOrder,
} from '@app/state/actions';
import { UrlParamsApi } from '@app/api/UrlParamsApi';
import { SearchApi } from '@app/api/SearchApi';

const config = {
  apiConfig: {},
  urlParamsApi: new UrlParamsApi(),
  searchApi: new SearchApi(),
};
const middlewares = [thunk.withExtraArgument(config)];
const mockStore = configureMockStore(middlewares);

describe('test query actions', () => {
  let store;
  let initialState = {
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
    store.clearActions();
  });

  it('fires a set initial state action', () => {
    const newQueryString = { queryString: 'this is my message' };
    const expectedActions = [
      {
        type: SET_QUERY_COMPONENT_INITIAL_STATE,
        payload: newQueryString,
      },
    ];

    store.dispatch(setInitialState(newQueryString));
    let actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });

  it('it parses url params to state and ignores unknown params', () => {
    const urlParams = [
      'q=this is my message',
      'sort=bestmatch',
      'order=asc',
      'p=1',
      's=10',
      'unknown=invalid',
    ];

    // push a new url to your desired param state
    window.history.pushState(
      {},
      'Test Title',
      `/test.html?${urlParams.join('&')}`
    );
    const newQueryState = {
      ...initialState,
      queryString: 'this is my message',
      sortBy: 'bestmatch',
      sortOrder: 'asc',
      page: 1,
      size: 10,
    };

    const expectedActions = [
      {
        type: SET_STATE_FROM_URL,
        payload: newQueryState,
      },
    ];

    // Do not trigger search or push new state
    store.dispatch(setQueryFromUrl(false, false));
    let actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });

  it('updates state with a new query string', () => {
    const newQueryString = 'this is my message';
    const expectedActions = [
      {
        type: SET_QUERY_STRING,
        payload: newQueryString,
      },
    ];

    store.dispatch(updateQueryString(newQueryString));
    let actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });

  it('updates state with a new sortBy value', () => {
    const newSortBy = 'mostrecent';
    const expectedActions = [
      {
        type: SET_QUERY_SORT_BY,
        payload: newSortBy,
      },
    ];

    store.dispatch(updateQuerySortBy(newSortBy));
    let actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });

  it('updates state with a new sortOrder value', () => {
    const newSortOrder = 'desc';
    const expectedActions = [
      {
        type: SET_QUERY_SORT_ORDER,
        payload: newSortOrder,
      },
    ];

    store.dispatch(updateQuerySortOrder(newSortOrder));
    let actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });
});
