'use strict';

exports.__esModule = true;
exports.Pagination = undefined;

var _store = require('../../store');

var _actions = require('../../state/actions');

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateQueryPage: function updateQueryPage(page) {
      return dispatch((0, _actions.updateQueryPaginationPage)(page));
    },
    setInitialState: function setInitialState(value) {
      return dispatch((0, _actions.setInitialState)(value));
    }
  };
};

var Pagination = exports.Pagination = (0, _store.connect)(function (state) {
  return {
    currentPage: state.query.page,
    currentSize: state.query.size,
    loading: state.results.loading,
    totalResults: state.results.data.total
  };
}, mapDispatchToProps)(_Pagination2.default);