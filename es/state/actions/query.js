import _regeneratorRuntime from 'babel-runtime/regenerator';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import _cloneDeep from 'lodash/cloneDeep';
import { QUERY_RESET_PAGE, SET_QUERY_COMPONENT_INITIAL_STATE, SET_STATE_FROM_URL, SET_QUERY_STRING, SET_QUERY_SORT_BY, SET_QUERY_SORT_ORDER, SET_QUERY_PAGINATION_PAGE, SET_QUERY_PAGINATION_SIZE, SET_QUERY_AGGREGATION, RESULTS_LOADING, RESULTS_FETCH_SUCCESS, RESULTS_FETCH_ERROR, RESULTS_UPDATE_LAYOUT } from '../types';

export var setInitialState = function setInitialState(initialState) {
  return function (dispatch) {
    dispatch({
      type: SET_QUERY_COMPONENT_INITIAL_STATE,
      payload: initialState
    });
  };
};

export var setQueryFromUrl = function setQueryFromUrl(searchDefault, pushState) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(dispatch, getState, config) {
      var urlParamsApi, queryState, newStateQuery;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              urlParamsApi = config.urlParamsApi;

              if (!urlParamsApi) {
                _context.next = 6;
                break;
              }

              queryState = _cloneDeep(getState().query);
              newStateQuery = urlParamsApi.get(queryState, pushState);
              _context.next = 6;
              return dispatch({
                type: SET_STATE_FROM_URL,
                payload: newStateQuery
              });

            case 6:
              if (searchDefault) {
                dispatch(_executeQuery(false));
              }

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

export var updateQueryString = function updateQueryString(queryString) {
  var updateSortingBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(dispatch) {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return dispatch({
                type: SET_QUERY_STRING,
                payload: queryString
              });

            case 2:

              dispatch(_executeQuery());

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x5) {
      return _ref2.apply(this, arguments);
    };
  }();
};

export var updateQuerySortBy = function updateQuerySortBy(sortByValue) {
  return function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(dispatch) {
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return dispatch({
                type: SET_QUERY_SORT_BY,
                payload: sortByValue
              });

            case 2:
              dispatch(_executeQuery());

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x6) {
      return _ref3.apply(this, arguments);
    };
  }();
};

export var updateQuerySortOrder = function updateQuerySortOrder(sortOrderValue) {
  return function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(dispatch) {
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return dispatch({ type: SET_QUERY_SORT_ORDER, payload: sortOrderValue });

            case 2:
              dispatch(_executeQuery());

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x7) {
      return _ref4.apply(this, arguments);
    };
  }();
};

export var updateQueryPaginationPage = function updateQueryPaginationPage(page) {
  return function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(dispatch) {
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return dispatch({ type: SET_QUERY_PAGINATION_PAGE, payload: page });

            case 2:
              dispatch(_executeQuery(true, false));

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x8) {
      return _ref5.apply(this, arguments);
    };
  }();
};

export var updateQueryPaginationSize = function updateQueryPaginationSize(size) {
  return function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(dispatch) {
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return dispatch({ type: SET_QUERY_PAGINATION_SIZE, payload: size });

            case 2:
              dispatch(_executeQuery());

            case 3:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x9) {
      return _ref6.apply(this, arguments);
    };
  }();
};

export var updateQueryAggregation = function updateQueryAggregation(path) {
  return function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(dispatch) {
      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return dispatch({
                type: SET_QUERY_AGGREGATION,
                payload: path
              });

            case 2:
              dispatch(_executeQuery());

            case 3:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this);
    }));

    return function (_x10) {
      return _ref7.apply(this, arguments);
    };
  }();
};

export var updateResultsLayout = function updateResultsLayout(layout) {
  return function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(dispatch, getState, config) {
      var urlParamsApi, newStateQuery;
      return _regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              urlParamsApi = config.urlParamsApi;

              if (!urlParamsApi) {
                _context8.next = 8;
                break;
              }

              _context8.next = 4;
              return dispatch({
                type: RESULTS_UPDATE_LAYOUT,
                payload: layout
              });

            case 4:
              newStateQuery = getState().query;

              urlParamsApi.set(newStateQuery);
              _context8.next = 9;
              break;

            case 8:
              dispatch({
                type: RESULTS_UPDATE_LAYOUT,
                payload: layout
              });

            case 9:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this);
    }));

    return function (_x11, _x12, _x13) {
      return _ref8.apply(this, arguments);
    };
  }();
};

export var _executeQuery = function _executeQuery() {
  var refreshUrlParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var resetQueryPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(dispatch, getState, config) {
      var state, urlParamsApi, apiConfig, searchApi, setSortByOnEmptyQuery, queryState;
      return _regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              state = getState();
              urlParamsApi = config.urlParamsApi;
              apiConfig = _extends({}, config.apiConfig);
              searchApi = config.searchApi;
              setSortByOnEmptyQuery = config.setSortByOnEmptyQuery;

              if (!(resetQueryPage && state.query.page != 1)) {
                _context9.next = 8;
                break;
              }

              _context9.next = 8;
              return dispatch({ type: QUERY_RESET_PAGE });

            case 8:
              if (!(setSortByOnEmptyQuery && state.query.queryString == '')) {
                _context9.next = 11;
                break;
              }

              _context9.next = 11;
              return dispatch({
                type: SET_QUERY_SORT_BY,
                payload: setSortByOnEmptyQuery
              });

            case 11:
              queryState = getState().query;

              if (urlParamsApi && refreshUrlParams) {
                urlParamsApi.set(queryState);
              }

              dispatch({ type: RESULTS_LOADING });

              searchApi.search(queryState, apiConfig).then(function (response) {
                var data = searchApi.serialize(response.data);
                dispatch({
                  type: RESULTS_FETCH_SUCCESS,
                  payload: {
                    aggregations: data.aggregations,
                    hits: data.hits,
                    total: data.total
                  }
                });
              }).catch(function (reason) {
                dispatch({ type: RESULTS_FETCH_ERROR, payload: reason });
              });

            case 15:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, _this);
    }));

    return function (_x16, _x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }();
};