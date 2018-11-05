'use strict';

exports.__esModule = true;
exports.ResultsPerPage = undefined;

var _store = require('../../store');

var _actions = require('../../state/actions');

var _ResultsPerPage = require('./ResultsPerPage');

var _ResultsPerPage2 = _interopRequireDefault(_ResultsPerPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateQuerySize: function updateQuerySize(size) {
      return dispatch((0, _actions.updateQueryPaginationSize)(size));
    },
    setInitialState: function setInitialState(value) {
      return dispatch((0, _actions.setInitialState)(value));
    }
  };
};

var ResultsPerPage = exports.ResultsPerPage = (0, _store.connect)(function (state) {
  return {
    currentSize: state.query.size,
    totalResults: state.results.data.total,
    loading: state.results.loading
  };
}, mapDispatchToProps)(_ResultsPerPage2.default);