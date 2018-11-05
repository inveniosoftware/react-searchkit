'use strict';

exports.__esModule = true;
exports.SortOrder = undefined;

var _store = require('../../store');

var _actions = require('../../state/actions');

var _SortOrder = require('./SortOrder');

var _SortOrder2 = _interopRequireDefault(_SortOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateQuerySortOrder: function updateQuerySortOrder(sortOrderValue) {
      return dispatch((0, _actions.updateQuerySortOrder)(sortOrderValue));
    },
    setInitialState: function setInitialState(value) {
      return dispatch((0, _actions.setInitialState)(value));
    }
  };
};

var SortOrder = exports.SortOrder = (0, _store.connect)(function (state) {
  return {
    total: state.results.data.total,
    currentSortOrder: state.query.sortOrder,
    loading: state.results.loading
  };
}, mapDispatchToProps)(_SortOrder2.default);