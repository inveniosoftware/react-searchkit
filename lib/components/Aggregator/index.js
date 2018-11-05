'use strict';

exports.__esModule = true;
exports.Aggregator = undefined;

var _store = require('../../store');

var _actions = require('../../state/actions');

var _Aggregator = require('./Aggregator');

var _Aggregator2 = _interopRequireDefault(_Aggregator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateQueryAggregation: function updateQueryAggregation(field, value) {
      return dispatch((0, _actions.updateQueryAggregation)(field, value));
    },
    setInitialState: function setInitialState(value) {
      return dispatch((0, _actions.setInitialState)(value));
    }
  };
};

var Aggregator = exports.Aggregator = (0, _store.connect)(function (state) {
  return {
    userSelectionAggregations: state.query.aggregations,
    resultsAggregations: state.results.data.aggregations
  };
}, mapDispatchToProps)(_Aggregator2.default);