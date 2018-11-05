'use strict';

exports.__esModule = true;
exports.SearchBar = undefined;

var _store = require('../../store');

var _actions = require('../../state/actions');

var _SearchBar = require('./SearchBar');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateQueryString: function updateQueryString(query) {
      return dispatch((0, _actions.updateQueryString)(query));
    }
  };
};

var SearchBar = exports.SearchBar = (0, _store.connect)(function (state) {
  return {
    queryString: state.query.queryString
  };
}, mapDispatchToProps)(_SearchBar2.default);