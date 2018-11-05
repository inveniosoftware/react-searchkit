'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _truncate2 = require('lodash/truncate');

var _truncate3 = _interopRequireDefault(_truncate2);

var _ = require('./..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsMultiLayout = function (_Component) {
  _inherits(ResultsMultiLayout, _Component);

  function ResultsMultiLayout(props) {
    _classCallCheck(this, ResultsMultiLayout);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.items = props.items;
    return _this;
  }

  ResultsMultiLayout.prototype.renderResultsList = function renderResultsList(items, layout) {
    return layout == 'list' ? _react2.default.createElement(_.ResultsList, { items: items }) : _react2.default.createElement(_.ResultsGrid, { items: items });
  };

  ResultsMultiLayout.prototype.render = function render() {
    var _props = this.props,
        currentLayout = _props.currentLayout,
        loading = _props.loading,
        totalResults = _props.totalResults,
        items = _props.items;


    return _react2.default.createElement(
      _.ShouldRender,
      { condition: currentLayout && !loading && totalResults > 0 },
      this.renderResultsList(items, currentLayout)
    );
  };

  return ResultsMultiLayout;
}(_react.Component);

exports.default = ResultsMultiLayout;


ResultsMultiLayout.propTypes = process.env.NODE_ENV !== "production" ? {
  items: _propTypes2.default.array.isRequired,
  currentLayout: _propTypes2.default.string,
  loading: _propTypes2.default.bool.isRequired,
  totalResults: _propTypes2.default.number.isRequired
} : {};

ResultsMultiLayout.defaultProps = {
  currentLayout: undefined
};
module.exports = exports['default'];