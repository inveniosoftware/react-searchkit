'use strict';

exports.__esModule = true;
exports.LayoutSwitcher = undefined;

var _store = require('../../store');

var _actions = require('../../state/actions');

var _LayoutSwitcher = require('./LayoutSwitcher');

var _LayoutSwitcher2 = _interopRequireDefault(_LayoutSwitcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateLayout: function updateLayout(layout) {
      return dispatch((0, _actions.updateResultsLayout)(layout));
    },
    setInitialState: function setInitialState(initialState) {
      return dispatch((0, _actions.setInitialState)(initialState));
    }
  };
};
var LayoutSwitcher = exports.LayoutSwitcher = (0, _store.connect)(function (state) {
  return {
    currentLayout: state.query.layout,
    loading: state.results.loading,
    totalResults: state.results.data.total
  };
}, mapDispatchToProps)(_LayoutSwitcher2.default);