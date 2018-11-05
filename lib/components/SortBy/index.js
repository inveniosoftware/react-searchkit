'use strict';

exports.__esModule = true;
exports.SortBy = undefined;

var _store = require('../../store');

var _actions = require('../../state/actions');

var _SortBy = require('./SortBy');

var _SortBy2 = _interopRequireDefault(_SortBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateQuerySortBy: function updateQuerySortBy(sortByValue) {
      return dispatch((0, _actions.updateQuerySortBy)(sortByValue));
    },
    setInitialState: function setInitialState(value) {
      return dispatch((0, _actions.setInitialState)(value));
    }
  };
};

var SortBy = exports.SortBy = (0, _store.connect)(function (state) {
  return {
    total: state.results.data.total,
    currentSortBy: state.query.sortBy,
    loading: state.results.loading
  };
}, mapDispatchToProps)(_SortBy2.default);